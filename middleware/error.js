module.exports = function (err, req, res, next) {
  // Log the exception on database server failure
  // Return to complete
  console.log(err)
  res.status(500).send('Something has failed')
}