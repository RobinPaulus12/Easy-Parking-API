export const getCarByID = async (clientSQL, car_id) => {
    return (await clientSQL.query('SELECT car_id, license_plate, model, fk_user FROM car WHERE car_id = $1', [car_id])).rows[0];
};


export const getAllCars= async (SQLClient, limit, offset,search) => {
    const query = `SELECT * FROM car  JOIN "user" ON car.fk_user = "user".user_id
            WHERE car.license_plate ILIKE $1 
            OR car.model ILIKE $1 
            OR "user".username ILIKE $1
            ORDER BY car_id LIMIT $2 OFFSET $3`;
    return await SQLClient.query(query, [`%${search}%`,limit, offset]);
};

export const getCarsByUserID = async (clientSQL, user_id) => {
    return (await clientSQL.query(
        'SELECT car_id, license_plate, model, fk_user FROM car WHERE fk_user = $1',
        [user_id]
    )).rows; 
};

export const createCar = async (SQLClient, { license_plate, model, fk_user }) => {
    const { rows } = await SQLClient.query(
        'INSERT INTO car (license_plate, model, fk_user) VALUES ($1, $2, $3) RETURNING car_id',
        [license_plate, model, fk_user]
    );
    return rows[0]?.car_id;
};


export const deleteCar = async (SQLClient, {car_id}) => {
    return await SQLClient.query('DELETE FROM car WHERE car_id = $1', [car_id]);
};


export const updateCar = async(SQLClient, {license_plate, model, fk_user, car_id}) => {
    let query = 'UPDATE car SET ';
    const querySet = [];
    const queryValues = [];
    if(license_plate){
        queryValues.push(license_plate);
        querySet.push(`license_plate = $${queryValues.length}`);
    }
    if(model){
        queryValues.push(model);
        querySet.push(`model = $${queryValues.length}`);
    }
    if(fk_user){
        queryValues.push(fk_user);
        querySet.push(`fk_user = $${queryValues.length}`);
    }
    if(queryValues.length > 0){
        queryValues.push(car_id);
        query += `${querySet.join(', ')} WHERE car_id = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    } else {
        throw new Error('No field given');
    }
};