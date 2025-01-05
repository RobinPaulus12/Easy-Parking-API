import vine from '@vinejs/vine';

const userSchema = vine.object({
    user_id: vine.number(),
    name: vine.string().trim().optional(),
    firstname: vine.string().trim().optional(),
    date_of_birth: vine.date().optional(),
    username: vine.string().trim().optional(),
    password: vine.string().optional(),
    avatar : vine.boolean().optional()
});

const userIDSchema = vine.object({
    user_id: vine.number(),
});

export const user = vine.compile(userSchema);
export const deleteUser = vine.compile(userIDSchema);