import vine from '@vinejs/vine';

const userSchema = vine.object({
    name: vine.string().trim(),
    firstname: vine.string().trim(),
    date_of_birth: vine.date(),
    username: vine.string().trim(),
    password: vine.string(),
    isAdmin:vine.boolean(),
});

const loginSchema = vine.object({
    username: vine.string(),
    password: vine.string()
});

const updateSchema = vine.object({
    name: vine.string().trim().optional(),
    firstname: vine.string().trim().optional(),
    date_of_birth: vine.date().optional(),
    username: vine.string().trim().optional(),
    password: vine.string().optional(),
    isAdmin:vine.boolean().optional()
});

const updateByAdminShema = vine.object({
    user_id: vine.number(), 
    name: vine.string().trim().optional(),
    firstname: vine.string().trim().optional(),
    date_of_birth: vine.date().optional(),
    username: vine.string().trim().optional(),
    password: vine.string().optional(),
    isAdmin:vine.boolean().optional()
});

const userIDSchema = vine.object({
    user_id: vine.number(),
});


export const
    user = vine.compile(userSchema),
    login = vine.compile(loginSchema),
    update = vine.compile(updateSchema),
    updateByAdmin = vine.compile(updateByAdminShema),
    deleteUser = vine.compile(userIDSchema);