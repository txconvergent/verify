'''VERIFY'''
'''NOTE: This code is not original. It has been commented to understand how hashing is integrated with
the blockchain.'''
import hashlib as hasher

class Block:
    def_init_(self, index, timestamp, data, previous_hash):
        # index of object on the blockchain
        self.index = index
        # timestamp of the object on the blockchain
        self.timestamp = timestamp
        # data being stored on the blockchain
        self.data = data
        # refers to the hashcode of the previous object
        self.previous_hash = previous_hash
        # refers to the hashcode of the object itself
        self.hash = self.hash_block();

    def hash_block(self):
        # hash creation
        sha = hasher.sha256();
        # hash value includes the index on the blockchain, timestamp, data itself, and the previous hashcode
        sha.update(str(self.index) +
                   str(self.timestamp) +
                   str(self.data) +
                   str(self.previous_hash))
        return sha.hexdigest() # generates value of the hashcode

import datetime as date

    def create_genesis_block():
    # Manually construct a block with
    # index zero and arbitrary previous hash
    return Block(0, date.dateTime.now(), "Genesis Block", "0")





