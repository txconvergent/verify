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
            str(self.index) +
            str(self.timestamp) +
            str(self.data) +
            str(self.previousHash) +
            str(self.nonce)
        )
        return sha.hexdigest()

    def make_block(self, level):
            while(self.hash[:level] != "0"*level):
                self.hash = self.calculate_Hashcode()
                self.nonce += 1
            print "Made Block: ", self.hash
            return self.hash;

    def check_if_exists(self, level):
        new_hash = " "
        self.nonce = 0
        while(new_hash[:difficulty] != "0"*level):
            new_hash = self.calculate_Hashcode()
            self.nonce += 1
        return new_hash

class blockchain(block)

    def __init__(self):
        self.chain = [self.create_genesis_block]
        # level is used for mining purposes
        self.level = 3

    def create_genesis_block(self):
        return block(0, date.datetimenow(), "Genesis Block", "0")

    def get_latest_block(self):
        return self.chain[len(self.chain)-1]

    def add_block(self, new_block):
        new_block.previousHash = self.get_latest_block().__hash__()
        new_block.make_block(self.level)
        self.chain.append(new_block)

    def print_blockchain(self):
        print "Start Blockchain:"
        print "Block Number:", self.chain[0].index, "data stored:", self.chain[0].data
        print "Previous Hash:", self.chain[0].previousHash
        print "Current Hash:", self.chain[0].calculate_Hash()
        for i in range(1, len(self.chain)):
            print "Block Number:", self.chain[i].index, "data stored: ", self.chain[i].data





