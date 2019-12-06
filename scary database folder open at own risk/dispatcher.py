import json, urllib.parse , urllib.request , unittest, requests
from databaseManager import databaseManager


class Dispatcher( object ):

    def __init__( self ):

        self.redditSide = redditSide()
        self.audioSide = audioSide()
        self.database = databaseManager()
