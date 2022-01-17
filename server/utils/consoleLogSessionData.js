module.exports = async (title = "no title", req, res) => {
    console.log(`---- ${title} ----`);
    console.log({
        "req.session": req?.session,
        "req.sessionID": req?.sessionID,
        "req.session.cookie": req?.session?.cookie,
        "req.cookies": req?.cookies,
        "res.cookie": res?.cookie
    })
}