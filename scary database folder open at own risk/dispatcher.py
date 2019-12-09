import json, urllib.parse , urllib.request , unittest, requests
from databaseManager import databaseManager


class Dispatcher( object ):

    def __init__( self ):
        self.database = databaseManager()

    def request( self , environ ):

        # Parse environ
        dict = { }
        dict[ 'method' ] = environ[ 'REQUEST_METHOD' ]
        dict[ 'path_info' ] = environ[ 'PATH_INFO' ]
        dict[ 'query' ] = urllib.parse.parse_qs( environ[ 'QUERY_STRING' ] )
        dict[ 'length' ] = 0
        dict[ 'body'] = None
        query = dict[ 'query' ]
        path = dict[ 'path_info' ]
        path_list = path.split( "/" )
        for i in path_list:
            if len(i) == 0:
                path_list.remove(i)

        if path_list[0] != "placeHolderName":
            return{'Status_code' : "400" , 'Reason' : "Invalid Path"}

        path_list.remove(path_list[0])

        if 'CONTENT_LENGTH' in environ and environ[ 'CONTENT_LENGTH' ] != "":
            dict[ 'length' ] = int( environ[ 'CONTENT_LENGTH' ] )

        if dict[ 'length' ] > 0:

            if not environ[ 'CONTENT_TYPE' ].startswith( 'application/json' ) or \
               not environ[ 'CONTENT_TYPE' ].endswith( 'utf-8' ):
               raise badParameterException

            body = environ[ 'wsgi.input' ].read( dict[ 'length' ] )
            dict[ 'body' ] = json.loads( body.decode( 'utf-8' ) )

        return self.fulflillRequest( dict[ 'method' ] , query ,
                                     dict[ 'body' ] , path_list )
