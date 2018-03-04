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
            str.encode(self.index) +
            str.encode(self.timestamp) +
            str.encode(self.data) +
            str.encode(self.previousHash) +
            str.encode(str(self.nonce))
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

class blockchain(block):

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
        print("Start Blockchain:")
        print("Block Number:", self.chain[0].index, "data stored:", self.chain[0].data)
        print("Previous Hash:", self.chain[0].previousHash)
        print("Current Hash:", self.chain[0].calculate_Hash())
        for i in range(1, len(self.chain)):
            print ("Block Number:", self.chain[i].index, "data stored: ", self.chain[i].data)
            print ("Previous Hash:", self.chain[i].previousHash)
            print ("Current Hash:", self.chain[i].make_block(self.level))

    def chain_validity(self):
        for i in range(1, len(self.chain)):
            if self.chain[i].hash != self.chain[i].check_if_exists(self.level):
                print ("Current Hash,", self.cahin[i].hash, "Do not match with a previously mined Hash", self.chain[i].check_if_exists(self.level))
                return False
            elif self.chain[i-1].hash != self.chain[i].previousHash:
                print ("Previous Hash", self.chain[i-1].hash, "Does not match with the Previous Hash", self.chain[i].previousHash)
                return False
            return True


photo_data = blockchain()

print("Mining block 1")
photo_data.add_block(block("1", "03/04/2018", 50, "0"))
print("Mining block 2")
photo_data.add_block(block("2", "03/04/2018", 40, "0"))
print("Mining block 3")
photo_data.add_block(block("3", "03/04/2018", 30, "0"))
print("Mining block 4")
photo_data.add_block(block("4", "03/04/2018", 20, "0"))
print("Mining block 5")
photo_data.add_block(block("5", "03/04/2018", 10, "0"))
print("_______________________________")
photo_data.print_chain()
print("_______________________________")
print(photo_data.chain_validity())
print("_______________________________")
photo_data.chain[2].data = 100
photo_data.print_chain()
print(photo_data.chain_validity())
print("_______________________________")


