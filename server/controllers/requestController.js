// // USER HELP REQUEST SENT 

// const submitRequest = async (req, res) => {

//     try {
//         const { reasonForRequest, amountRequested, category } = req.body;
//         if (!reasonForRequest) {
//             return res.status(400).json({ message: 'reason for request is required' })
//         }

//         const newReq = new Request({
//             user: req.user.id, reasonForRequest, amountRequested, category
//         });

//         await newReq.save();
//         alert("Sucessful")
//         return res.status(201).json({ sucess: true, data: newReq });

//     } catch (error) {
//         console.error(err);
//         return res.status(500).json({ message: "Server error" })
//     }
// }





// module.exports = { submitRequest };