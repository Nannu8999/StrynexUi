import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { apiCalling } from '../../apiService/apiCalling'
import {
    CSmartTable,
    CButton,
    CCollapse,
    CAvatar,
    CBadge,
} from '@coreui/react-pro'

const getBadge = (status) => {
    switch (status) {
        case 'Active':
            return 'success'
        case 'Inactive':
            return 'secondary'
        case 'Pending':
            return 'warning'
        case 'Banned':
            return 'danger'
        default:
            return 'primary'
    }
}

export default function UserListing() {

    const [usersData, setUsersData] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [details, setDetails] = useState([])
    const token = useSelector((state) => state.auth.token)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            try {

                const data = await apiCalling({
                    url: '/GetUsers',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })

                const formattedData = data.map((user) => ({
                    ...user,
                    id: user.userId,
                    name: `${user.firstName} ${user.middleName || ''} ${user.lastName}`,
                    role: user.role || 'User',
                    status: user.status || 'Active',
                }))

                setUsersData(formattedData)
            } catch (error) {
                console.error('Error fetching users:', error)
            }
        }

        fetchUsers()
    }, [token])

    const toggleDetails = (id) => {
        const position = details.indexOf(id)
        let newDetails = [...details]
        if (position === -1) {
            newDetails = [...details, id]
        } else {
            newDetails.splice(position, 1)
        }
        setDetails(newDetails)
    }

    const columns = [
        {
            key: 'avatar',
            label: 'Profile',
            filter: false,
            sorter: false,
        },
        {
            key: 'name',
            label: 'Name',
        },
        {
            key: 'email',
        },
        {
            key: 'role',
        },
        {
            key: 'status',
        },
        {
            key: 'show_details',
            label: '',
            filter: false,
            sorter: false,
        },
    ]

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '20px' }}>
                <CButton
                    color="primary"
                    onClick={() => navigate(`/viewUser/${selectedUser?.userId}`)}
                    disabled={!selectedUser}
                >
                    View User
                </CButton>

                <CButton color="primary" onClick={() => navigate('/addUser')}>
                    Add User
                </CButton>

            </div>

            <h2>User Listing</h2>

            <CSmartTable
                items={usersData}
                columns={columns}
                columnFilter
                columnSorter
                tableFilter
                pagination
                itemsPerPage={5}
                selectable
                clickableRows
                onSelectedItemsChange={(items) => {
                    setSelectedUser(items[0] || null)
                }}
                scopedColumns={{
                    avatar: (item) => (
                        <td>
                            <CAvatar
                                src={item.profilePicUrl || require('../../assets/N-1.png')}
                            />
                        </td>
                    ),
                    status: (item) => (
                        <td>
                            <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                        </td>
                    ),
                    show_details: (item) => (
                        <td>
                            <CButton
                                color="primary"
                                variant="outline"
                                size="sm"
                                onClick={() => toggleDetails(item.id)}
                            >
                                {details.includes(item.id) ? 'Hide' : 'Show'}
                            </CButton>
                        </td>
                    ),
                    details: (item) => (
                        <CCollapse visible={details.includes(item.id)}>
                            <div className="p-3">
                                <h5>{item.name}</h5>
                                <p>Email: {item.email}</p>
                                <p>Role: {item.role}</p>
                                <p>Status: {item.status}</p>
                                <CButton size="sm" color="info">
                                    Settings
                                </CButton>
                                <CButton size="sm" color="danger" className="ms-2">
                                    Delete
                                </CButton>
                            </div>
                        </CCollapse>
                    ),
                }}
                tableProps={{
                    striped: true,
                    hover: true,
                    responsive: true,
                }}
                tableBodyProps={{
                    className: 'align-middle',
                }}
            />
        </div>
    )
}
