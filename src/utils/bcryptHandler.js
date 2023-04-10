const bcrypt=require('bcrypt')

const encriptPassword= async (password)=>{
    const hash = await bcrypt.hash(password,10)
    return hash
}

const comparePassword= async (password,hash)=>{
    return await bcrypt.compare(password,hash)
}

module.exports={encriptPassword,comparePassword}