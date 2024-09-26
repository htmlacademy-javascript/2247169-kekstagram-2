const DESC_LENGTH = 140;
const errorDescriptionMessage = `Длина комментария не может составлять больше ${DESC_LENGTH} символов`;

const validateDescriptionLength = (value) => value.length <= DESC_LENGTH;

export { validateDescriptionLength, errorDescriptionMessage };
