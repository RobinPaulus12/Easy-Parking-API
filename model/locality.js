export const readLocality = async (SQLClient, {locality_id}) => {
    const {rows} = await SQLClient.query('SELECT * FROM locality WHERE locality_id = $1', [locality_id]);
    return rows[0];
};

export const getAllLocalities = async (SQLClient) => {
    return (await SQLClient.query('SELECT * from locality'));
};

export const getAllLocalitiesPagination = async (SQLClient,limit, offset,search) => {
    const query = `SELECT * FROM locality 
    WHERE city ILIKE $1 or country ILIKE $1 
    or postal_code ILIKE $1 or street_name ILIKE $1
    ORDER BY locality_id LIMIT $2 OFFSET $3`;
    return await SQLClient.query(query, [`%${search}%`,limit, offset]);
};

export const createLocality = async (SQLClient, {city, country, postal_code, street_name}) => {
    const {rows} = await SQLClient.query(
        'INSERT INTO locality (city, country, postal_code, street_name) VALUES ($1, $2, $3, $4) RETURNING locality_id',
        [city, country, postal_code, street_name]
    );
    return rows[0];
};

export const deleteLocality = async (SQLClient, {locality_id}) => {
    return await SQLClient.query('DELETE FROM locality WHERE locality_id = $1', [locality_id]);
};


export const updateLocality = async(SQLClient, {city, country, postal_code, street_name, locality_id}) => {
    let query = 'UPDATE locality SET ';
    const querySet = [];
    const queryValues = [];
    if(city){
        queryValues.push(city);
        querySet.push(`city = $${queryValues.length}`);
    }
    if(country){
        queryValues.push(country);
        querySet.push(`country = $${queryValues.length}`);
    }

    if(postal_code){
        queryValues.push(postal_code);
        querySet.push(`postal_code = $${queryValues.length}`);
    }

    if(street_name){
        queryValues.push(street_name);
        querySet.push(`street_name = $${queryValues.length}`);
    }

    if(queryValues.length > 0){
        queryValues.push(locality_id);
        query += `${querySet.join(', ')} WHERE locality_id = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    } else {
        throw new Error('No field given');
    }
};