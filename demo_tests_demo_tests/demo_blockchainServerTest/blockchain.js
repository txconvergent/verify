class Blockchain {
  constructor () {
    // Create chain and transaction
    this.chain = []
    
    // Binding of this
    this.newBLock = this.newBLock.bind(this)
    this.newTransaction = this.newTransaction.bind(this)
    this.lastBlock = this.lastBlock.bind(this)
    this.proofOfWork = this.proofOfWork.bind(this)
  }

  newBlock () {
  const block = {
    index: this.chain.length + 1,
    timestamp: new Date(),
    transactions: this.current_transactions,
    proof: proof,
    previous_hash: previousHash
  }
  // In the future deque, so don't need to reset
  this.chain.push(block)
  return block
  }

  lastBlock () {
    return this.chain.slice(-1)[0]
  }

  validProof (lastProof, proof) {
    const guessHash = crypto.createHmac(process.env.HASH_TYPE, process.env.CRYPTO_SECRET)
    .update (`${lastProof}${proof}`)
    .digest(`hex`)
    return guessHash.substr(0, 5) === process.env.RESOLUTION_HASH
  }

  proofOfWork (lastProof) {
    let proof = 0
    while (true) {
      if (!this.validProof(lastProof, proof)) {
        proof++
      } else {
        break
      }
    }
    return proof
  }
}

module.exports = Blockchain