let showToastFunction;

export const setShowToast = (fn) => {
    showToastFunction = fn;
};

export const triggerToast = (message) => {
    if (showToastFunction) {
        showToastFunction(message);
    }
};
