const mysql = require("mysql");

class Database {
  constructor( config ) {
      this.connection = mysql.createConnection( config );
  }
  query( sql, args ) {
      return new Promise( ( resolve, reject ) => {
          this.connection.query( sql, args, ( err, rows ) => {
              if ( err )
                  return reject( err );
              resolve( rows );
          } );
      } );
  }
  close() {
      return new Promise( ( resolve, reject ) => {
          this.connection.end( err => {
              if ( err )
                  return reject( err );
              resolve();
          } );
      } );
  }
}

const db = new Database({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "r00tr00t",
  database: "ice_creamDB"
});

// wrap in try-catch for error handling catching
async function main(){
    try {
        console.log( "starting≥.." );

        const rows = await db.query( 'SELECT * FROM products' );
        console.log( `.. retrived ${rows.length}`, rows );

        const result = await db.query( "INSERT INTO products (flavor,price,quantity) VALUES('banana','0.99',1)" );
        console.log( ` .. wrote data: id=`, result.insertId );
    
    } catch ( err ) {
        // handle the error
        console.log( `sorry a problem killed this: ${err}` );
    } finally {
        //run afetr all else done, so close-down/cleanup code
        await db.close();
    }
}

main();
