export const readParking = async (SQLClient, {parking_id}) => {
    const {rows} = await SQLClient.query('SELECT * FROM parking WHERE parking_id = $1', [parking_id]);
    return rows[0];
};

export const createParking = async (SQLClient, {name, coordinates, places, telephone, opening, place_width, fk_locality}) => {
    const {rows} = await SQLClient.query('INSERT INTO parking (name, coordinates, places, telephone, opening, place_width, fk_locality) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING parking_id', [name, coordinates, places, telephone, opening, place_width, fk_locality]);
    return rows[0];
};

export const deleteParking = async (SQLClient, {parking_id}) => {
    return await SQLClient.query('DELETE FROM parking WHERE parking_id = $1', [parking_id]);
};

export const getAllParkings = async (SQLClient) => {
    return (await SQLClient.query('SELECT * from parking'));
};

export const updateParking = async(SQLClient, {name, coordinates, places, telephone, opening, place_width, fk_locality, parking_id}) => {
    let query = 'UPDATE parking SET ';
    const querySet = [];
    const queryValues = [];
    if(name){
        queryValues.push(name);
        querySet.push(`name = $${queryValues.length}`);
    }
    if(coordinates){
        queryValues.push(coordinates);
        querySet.push(`coordinates = $${queryValues.length}`);
    }
    if(places){
        queryValues.push(places);
        querySet.push(`places = $${queryValues.length}`);
    }

    if(telephone){
        queryValues.push(telephone);
        querySet.push(`telephone = $${queryValues.length}`);
    }

    if(opening){
        queryValues.push(opening);
        querySet.push(`opening = $${queryValues.length}`);
    }

    if(place_width){
        queryValues.push(place_width);
        querySet.push(`place_width = $${queryValues.length}`);
    }

    if(fk_locality){
        queryValues.push(fk_locality);
        querySet.push(`fk_locality = $${queryValues.length}`);
    }

    if(queryValues.length > 0){
        queryValues.push(parking_id);
        query += `${querySet.join(', ')} WHERE parking_id = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    } else {
        throw new Error('No field given');
    }
};