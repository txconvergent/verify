'''VERIFY'''
'''NOTE: This code is not original. It has been commented to understand how hashing is integrated with
the blockchain.'''
import hashlib
import datetime as date

class block:
    def __init__(self, index, timestamp, data, previousHash):
        self.index = index
        self.timestamp = timestamp
        self.data = data
        self.previousHash = previousHash
        # nonce is an arbitrary number only used once
        self.nonce = 0
        self.hash = self.calculate_Hashcode()

    def calculate_Hashcode(self):
        sha = hashlib.sha1()
        sha.update(
            str(self.index).encode() +
            str(self.timestamp).encode() +
            str(self.data).encode() +
            str(self.previousHash).encode() +
            str(self.nonce).encode()
        )
        return sha.hexdigest()

    def make_block(self, level):
            while(self.hash[:level] != "0"*level):
                self.hash = self.calculate_Hashcode()
                self.nonce += 1
            print ("Made Block: ", self.hash)
            return self.hash;

    def check_if_exists(self, level):
        new_hash = " "
        self.nonce = 0
        while(new_hash[:difficulty] != "0"*level):
            new_hash = self.calculate_Hashcode()
            self.nonce += 1
        return new_hash