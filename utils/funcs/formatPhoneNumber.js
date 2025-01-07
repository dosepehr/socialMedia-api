formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber?.startsWith('0')) return phoneNumber;
    return `0${phoneNumber}`;
};

module.exports = formatPhoneNumber;
