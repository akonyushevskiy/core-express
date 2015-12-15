/**
* @api {get} /api/calculate/sum/ sum
* @apiGroup Calculate
* @apiName Sum
* @apiVersion 0.1.0
* @apiPermission none
* @apiHeader (Authorization) {String} JWT JWT token for user authentication.
* @apiParam {number} [a=0] First number
* @apiParam {number} [b=0] Second number
* @apiDescription Callculate summ of two numbers, working via GET and not require authorization
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*       "sum" : "3"
*   }
*  @apiError UserNotFound The id of the User was not found.
*  @apiErrorExample Error-Response:
*     HTTP/1.1 500 One of params is not a number
*     {
*       "error": "One of params is not a number"
*     }
*/

//@apiSampleRequest /api/calculate/sum/?a=1&b=2
exports.sum = function(req, res){
	"use strict";
	var a = req.query.a || 0,
		b = req.query.b || 0;

	if(isNaN(parseInt(a, 10)) || isNaN(parseInt(b, 10))){
		res.status(500).json({
			error: "One of is params not a number"
		});
		return;
	}

	res.status(200).json({
		sum : parseInt(a, 10) + parseInt(b, 10)
	});
};