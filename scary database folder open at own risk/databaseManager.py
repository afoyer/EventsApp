import mysql.connector as mysql

class DatabaseManager(object):

    def __init__( self ):
        self.conn = mysql.connect(
            host = "Localhost",
            user = "root",
            passwd = "Iolani123",
            database = "eventdb"
        )
        self.checkConnection()


    def checkConnection( self ):
        if self.conn is None:
            print("Not connected to Database")
            #add error
        else:
            print("Connected to Database ")

    def createDatabase( self ):

        sql_create_database = """CREATE DATABASE IF NOT EXISTS eventdb"""
        try:
            c = self.conn.cursor()
            c.execute( sql_create_database )
        except mysql.Error as e :
            print(e)

    def createEventsTable( self ):
        sql_create_table = """ CREATE TABLE IF NOT EXISTS events (
                               Event_ID INTEGER NOT NULL PRIMARY KEY,
                               Student_ID INTEGER NOT NUll,
                               Event_Name TEXT NOT NULL,
                               Event_Location TEXT NOT NULL,
                               Event_Description TEXT,
                               Event_Date TEXT NOT NULL,
                               Event_Start TEXT NOT NULL,
                               Event_End TEXT,
                               Tags TEXT,
                               Poster Blob,
                               CCSGA_Approved INTEGER NOT NULL); """
        try:
            c = self.conn.cursor()
            c.execute( sql_create_table )
        except mysql.Error as e :
        ###I know FIXX ME <><><<<
            print(e)

    def addEvent( self , Event_ID , Student_ID , Event_Name , Event_Location,
                  Event_Description , Event_Date , Event_Start , Event_End ,
                  Tags, Poster , approved ):


        sql_add_event = """INSERT INTO events (Event_ID , Student_ID ,
                                               Event_Name , Event_Location,
                                               Event_Description , Event_Date,
                                               Event_Start , Event_End ,
                                               Tags, Poster , CCSGA_Approved)
                            VALUES( %s , %s , %s , %s , %s , %s, %s , %s , %s ,%s, %s )"""

        event_info = ( Event_ID , Student_ID , Event_Name , Event_Location,
                       Event_Description , Event_Date , Event_Start , Event_End ,
                       Tags , Poster ,approved, )

        try:
            c = self.conn.cursor()
            c.execute( sql_add_event, event_info, )
            self.conn.commit()

        except mysql.Error as e :
            print(e)

    def getEventByID( self , event_id ):
        inner_dict = { }

        sql_get_event = """SELECT * FROM events"""

        attributes = [ 'Event_ID' , 'Student_ID' , 'Event_Name' , 'Event_Location',
                       'Event_Description' , 'Event_Date' , 'Event_Start' , 'Event_End' ,
                       'Tags' , 'Poster' ,'approved' ]
        try:
            c = self.conn.cursor()
            result = c.execute( "SELECT * FROM events" )
            myresult = c.fetchall()
            print(myresult)
            for row in myresult:
                for i in range( len(row) ):
                    inner_dict[ attributes[ i ] ] = row[ i ]
        except  mysql.Error as e:
            print(e)

        return inner_dict


def main():
    connect = DatabaseManager()
    ##connect.createDatabase()
    # connect.createEventsTable()
    # connect.addEvent( 1 , 173140 , "Event_Name" , "Event_Location",
    #               "Event_Description" , "Event_Date" , "Event_Start" , "Event_End" ,
    #               "Tags", None , 1)
    # result = connect.getEventByID( 1 )
    # for key in result:
    #     print( str(key) +": " + str(result[key]))

if __name__== "__main__":
  main()
#
# CREATE USER 'drewship'@'localhost' IDENTIFIED BY 'drewship'
# GRANT ALL PRIVILEGES ON pythondb.* To 'drewship'@'localhost'
# FLUSH PRIVILEGES
