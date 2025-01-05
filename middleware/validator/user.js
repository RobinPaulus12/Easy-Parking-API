import vine from '@vinejs/vine';

const userSchema = vine.object({
    name: vine.string().trim(),
    firstname: vine.string().trim(),
    date_of_birth: vine.date(),
    username: vine.string().trim(),
    password: vine.string(),
    avatar: vine.boolean().optional()
});

const loginSchema = vine.object({
    username: vine.string(),
    password: vine.string()
});

const updateSchema = vine.object({
    name: vine.string().trim().optional(),
    firstname: vine.string().trim().optional(),
    date_of_birth: vine.date().optional(),
    password: vine.string().optional(),
    avatar: vine.boolean().optional()
});

export const
    user = vine.compile(userSchema),
    login = vine.compile(loginSchema),
    update = vine.compile(updateSchema);