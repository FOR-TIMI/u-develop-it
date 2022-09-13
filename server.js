const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;




// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//SQL section
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Eriferere1010!',
      database: 'election'
    },
    console.log('Connected to the election database')
);

app.get('/api/candidates', (req,res) => {
    const sql = `SELECT * FROM candidates`;
    db.query(sql, (err, rows) => {
        if(err) return res.status(500).json({"Error message": err.message});
        return res.json({"message" : "success", "data": rows});
        
    })
})


app.get('/api/candidates/:id', (req,res) => {
    const params = req.params.id;
    const sql = `SELECT * FROM candidates WHERE id = ?`;

    db.query(sql, params, (err,row) => {
        if(err) return res.status(500).json({"Error message": err.message});
        if(row.length){
            res.json({"message" : "Success", "data": row});
        }
        else{
            res.status(404).json({"message" : "That candidate does not exist"})
        }
    })
})

// db.query(`SELECT * FROM candidates`, (err,rows) => {
//     if (err) console.error(err);
//     console.log(row);
// })



// Delete a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });

// db.query(`SELECT * FROM candidates`, (err,row) => {
//     if(err) console.error(err.message);
//     console.log(row)
// })

  // Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });