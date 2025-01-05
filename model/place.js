export const readPlace = async (SQLClient, {place_id}) => {
    const {rows} = await SQLClient.query('SELECT * FROM place WHERE place_id = $1', [place_id]);
    return rows[0];
};

export const getPlacesByParkingID = async (SQLClient, parking_id) => {
    return (await SQLClient.query(
        'SELECT place_id, arrival_time, departure_time FROM place WHERE fk_parking = $1',
        [parking_id]
    )).rows;
};

export const getAllPlaces = async (SQLClient) => {
    return (await SQLClient.query('SELECT * from place'));
};

export const createPlace = async (SQLClient, {arrival_time, departure_time, fk_parking}) => {
    const {rows} = await SQLClient.query('INSERT INTO place (arrival_time, departure_time, fk_parking) VALUES ($1, $2, $3) RETURNING place_id', [arrival_time, departure_time, fk_parking]);
    return rows[0]?.place_id;
};

export const deletePlace = async (SQLClient, {place_id}) => {
    return await SQLClient.query('DELETE FROM place WHERE place_id = $1', [place_id]);
};


export const updatePlace = async(SQLClient, {arrival_time, departure_time, fk_parking, place_id}) => {
    let query = 'UPDATE place SET ';
    const querySet = [];
    const queryValues = [];
    if(arrival_time){
        queryValues.push(arrival_time);
        querySet.push(`arrival_time = $${queryValues.length}`);
    }
    if(departure_time){
        queryValues.push(departure_time);
        querySet.push(`departure_time = $${queryValues.length}`);
    }

    if(fk_parking){
        queryValues.push(fk_parking);
        querySet.push(`fk_parking = $${queryValues.length}`);
    }

    if(queryValues.length > 0){
        queryValues.push(place_id);
        query += `${querySet.join(', ')} WHERE place_id = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    } else {
        throw new Error('No field given');
    }
};