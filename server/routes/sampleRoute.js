const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// sample GET server-side request
router.get('/', (req, res) => {
    // sample grab all data from database pg query
    let queryText = 'SELECT * FROM "table_name";';
    pool.query(queryText)
        .then(result => {
            // result.rows is result of queryText from database
            res.send(result.rows); 
        })
        .catch(error => {
            console.log('Query:', queryText, 'Error:', error);
            res.sendStatus(500);
        })
});

// sample POST server-side request
router.post('/', (req, res) => {
    const newPostData = req.body
    console.log('POST req.body is:', req.body);
    
    const queryText = `
    INSERT INTO "table_name" ("column_name", "column_name_two")
    VALUES ($1, $2);
    `;
    const values = [newPostData.property, newPostData.propertyTwo];
    pool.query(queryText, values) // pass queryText and array of values
        .then(result => {
            res.sendStatus(201);
            })
            .catch(error => {
                console.log('Query:', queryText, 'error:', error);
                res.sendStatus(500);
            })
});

router.delete('/:id', (req, res) => {
    let idToDelete = req.params.id;
    console.log(idToDelete);
    let queryText = 'DELETE FROM "table_name" WHERE "id"=$1';

    pool.query(queryText, [idToDelete])
    .then(result => {
        console.log('task deleted', result.rows);
        // sending back OK to indicate id row deleted successfuly
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('Error making delete query', error);
        res.sendStatus(500);
    })
})

router.put('/:id', (req, res) => {
    console.log( 'got to put' )

    let idToUpdate = req.params.id;
    let columnToUpdate = req.body.table_column_name;
    let columnToUpdateTwo = req.body.table_column_name_two

    let queryText = `
        UPDATE "table_name" SET "table_column" = $1, "table_column_two = $2
        WHERE "id" = $3
        `;
    // 
    pool.query(queryText, [req.body.table_column_name, req.body.table_column_name_two, idToUpdate])
    .then(result => {
        console.log('to-do list UPDATED', result.rows);
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('Error making PUT query', error);
        res.sendStatus(500);
    })
});

module.exports = router;