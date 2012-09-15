var 
	// sf     = require('node-salesforce'),
	_       = require('underscore'),
	nforce  = require('nforce'),
	express = require('express'),
	oauth;
;

var sfConfig = {
    clientId: '3MVG9Y6d_Btp4xp70fhdw_WBRxoI8hRfI4lpArdTkGViPJZpb9e1HvIuDE92oxPO8RazhOfUheM285c98xO0x'
    ,clientSecret:'1771297576320281256'
    ,redirectUri:'http://localhost:3001'
    ,loginServer: 'https://login.salesforce.com'
};



// var conn = new sf.Connection({
//   instanceUrl : 'https://ap1.salesforce.com',
//   accessToken : '<your Salesforrce OAuth2 access token is here>'
// // refreshToken : '<your Salesforce OAuth2 refresh token is here>'
// });

// var conn = new sf.Connection({
//   loginUrl : 'https://login.salesforce.com'
// });

// conn.login('sleipner@adambreen.com', 'P3r3$troika10', function(err) {
//   if (!err) {
//     console.log(conn.accessToken);
//     // ...
//   }
//   else {
//   	console.log('error:', err);
//   }
// });





var org = nforce.createConnection({
	clientId     : '3MVG9Y6d_Btp4xp70fhdw_WBRxoI8hRfI4lpArdTkGViPJZpb9e1HvIuDE92oxPO8RazhOfUheM285c98xO0x',
	clientSecret : '1771297576320281256',
	redirectUri  : 'http://localhost:3000/oauth/_callback',
	apiVersion   : 'v25.0',  // optional, defaults to v24.0
	environment  : 'production'  // optional, sandbox or production, production default
});


var 
	password                 = 'P3r3$troika101',
	securityTokenForUsername = 'r7duvCRDzeMGOCowE2rdfrssh',
	oauthPassword            = password + securityTokenForUsername
;


org.authenticate({ username: 'sleipner@adambreen.com', password: oauthPassword}, function(err, resp){
  if(!err) {
    console.log('Access Token: ' + resp.access_token);
    oauth = resp;

    testQuery();

  } 
  else {
	console.log('Error: ' + err.message);
  }
});


function getLeads(onError, cc, options){
	var 
		whereClauses = [],
		query = "SELECT Id, Assigned_To__c, IsDeleted, MasterRecordId, LastName, FirstName, Salutation, Name, RecordTypeId, Title, Company, Street, City, State, PostalCode, Country, Phone, Email, Website, Description, LeadSource, Status, Industry, Rating, AnnualRevenue, NumberOfEmployees, OwnerId, IsConverted, ConvertedDate, ConvertedAccountId, ConvertedContactId, ConvertedOpportunityId, IsUnreadByOwner, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, JigsawContactId, EmailBouncedReason, EmailBouncedDate, Partner_First_Name__c, Partner_Last_Name__c, Mobile_Number__c, Age__c, Partner_Age__c, Home_Phone__c, Industry_Superfund_Institution__c, Partner_Industry_Super_Fund_Institution__c, Partner_Industry_Super_Fund_Balance__c, SMSF_Balance__c, Partner_SMSF_Balance__c, Has_ASX_Shares__c, Has_Global_Markets_Shares__c, Registered_on_Australian_Do_Not_Call__c, Permission_To_Contact__c, Add_to_Sleipner_Do_Not_Call_register__c, Has_SMSF__c, Partner_Has_SMSF__c, Partner_Has_Industry_Super_Fund__c, Has_Industry_Super_Fund__c, Owns_Shares__c, Owns_Property__c, Owns_Residential_Property__c, Owns_Investment_Property__c, Investment_Term__c, Investment_Decision_Maker__c, Needs_Education__c, Needs_SMSF__c, Needs_PreAuth__c, Industry_Superfund_Comments__c, SMSF_Comments__c, Other_Investments_Comments__c, Financial_and_Lifestyle_Goals__c, Importance_Of_Goals__c, Is_the_Client_Motivated__c, Contact_Instructions__c, Additional_Notes__c, Join_Mailing_List__c, Approved_By__c, Industry_Superfund_Balance__c, Occupation__c, Partner_Occupation__c, Income_Bracket__c, Partner_Income_Bracket__c, Work_Phone__c from Lead"
	;

	if(options && options.sleipnerUsername) {
		var thisClauseIndex = whereClauses.push('Assigned_To__c INCLUDES (');

		if(!Array.isArray(options.sleipnerUsername)) options.sleipnerUsername = [options.sleipnerUsername]);
		
		_.each(options.sleipnerUsername, function (username, arrayIndex) {
			whereClauses[thisClauseIndex] += "'" + username + "'" + arrayIndex > 0 ? ',' : '';
		}

		whereClauses[thisClauseIndex] += ') '

	}

	if(whereClauses.length > 0){
		query += ' WHERE ';

		_.each(whereClauses, function (clause){

		})
	}


	var query = "select Id, Assigned_To__c, IsDeleted, MasterRecordId, LastName, FirstName, Salutation, Name, RecordTypeId, Title, Company, Street, City, State, PostalCode, Country, Phone, Email, Website, Description, LeadSource, Status, Industry, Rating, AnnualRevenue, NumberOfEmployees, OwnerId, IsConverted, ConvertedDate, ConvertedAccountId, ConvertedContactId, ConvertedOpportunityId, IsUnreadByOwner, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, JigsawContactId, EmailBouncedReason, EmailBouncedDate, Partner_First_Name__c, Partner_Last_Name__c, Mobile_Number__c, Age__c, Partner_Age__c, Home_Phone__c, Industry_Superfund_Institution__c, Partner_Industry_Super_Fund_Institution__c, Partner_Industry_Super_Fund_Balance__c, SMSF_Balance__c, Partner_SMSF_Balance__c, Has_ASX_Shares__c, Has_Global_Markets_Shares__c, Registered_on_Australian_Do_Not_Call__c, Permission_To_Contact__c, Add_to_Sleipner_Do_Not_Call_register__c, Has_SMSF__c, Partner_Has_SMSF__c, Partner_Has_Industry_Super_Fund__c, Has_Industry_Super_Fund__c, Owns_Shares__c, Owns_Property__c, Owns_Residential_Property__c, Owns_Investment_Property__c, Investment_Term__c, Investment_Decision_Maker__c, Needs_Education__c, Needs_SMSF__c, Needs_PreAuth__c, Industry_Superfund_Comments__c, SMSF_Comments__c, Other_Investments_Comments__c, Financial_and_Lifestyle_Goals__c, Importance_Of_Goals__c, Is_the_Client_Motivated__c, Contact_Instructions__c, Additional_Notes__c, Join_Mailing_List__c, Approved_By__c, Industry_Superfund_Balance__c, Occupation__c, Partner_Occupation__c, Income_Bracket__c, Partner_Income_Bracket__c, Work_Phone__c from Lead WHERE Assigned_To__c INCLUDES ('adam.breen', 'russell.green', 'bob') ";  //"!= NULL";
	// WHERE id='00Q9000000AmEJKEA3'";
	org.query(query, oauth, function(err, resp){
}







function testQuery(){
	// var query = 'SELECT Account.Id, Account.Name, (SELECT Name, ExampleField__c FROM Account.Client_Data_Questionnaires__r) FROM Account WHERE Account.Client_Data_Questionnaire__r != NULL LIMIT 10';
	// var query = 'SELECT Id, Name FROM Account';
	var query = "select Id, Assigned_To__c, IsDeleted, MasterRecordId, LastName, FirstName, Salutation, Name, RecordTypeId, Title, Company, Street, City, State, PostalCode, Country, Phone, Email, Website, Description, LeadSource, Status, Industry, Rating, AnnualRevenue, NumberOfEmployees, OwnerId, IsConverted, ConvertedDate, ConvertedAccountId, ConvertedContactId, ConvertedOpportunityId, IsUnreadByOwner, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, JigsawContactId, EmailBouncedReason, EmailBouncedDate, Partner_First_Name__c, Partner_Last_Name__c, Mobile_Number__c, Age__c, Partner_Age__c, Home_Phone__c, Industry_Superfund_Institution__c, Partner_Industry_Super_Fund_Institution__c, Partner_Industry_Super_Fund_Balance__c, SMSF_Balance__c, Partner_SMSF_Balance__c, Has_ASX_Shares__c, Has_Global_Markets_Shares__c, Registered_on_Australian_Do_Not_Call__c, Permission_To_Contact__c, Add_to_Sleipner_Do_Not_Call_register__c, Has_SMSF__c, Partner_Has_SMSF__c, Partner_Has_Industry_Super_Fund__c, Has_Industry_Super_Fund__c, Owns_Shares__c, Owns_Property__c, Owns_Residential_Property__c, Owns_Investment_Property__c, Investment_Term__c, Investment_Decision_Maker__c, Needs_Education__c, Needs_SMSF__c, Needs_PreAuth__c, Industry_Superfund_Comments__c, SMSF_Comments__c, Other_Investments_Comments__c, Financial_and_Lifestyle_Goals__c, Importance_Of_Goals__c, Is_the_Client_Motivated__c, Contact_Instructions__c, Additional_Notes__c, Join_Mailing_List__c, Approved_By__c, Industry_Superfund_Balance__c, Occupation__c, Partner_Occupation__c, Income_Bracket__c, Partner_Income_Bracket__c, Work_Phone__c from Lead WHERE Assigned_To__c INCLUDES ('adam.breen', 'russell.green', 'bob') ";  //"!= NULL";
	// WHERE id='00Q9000000AmEJKEA3'";
	org.query(query, oauth, function(err, resp){
	  
		if(err) { console.log(err); return;}

		// console.log(resp.records[0]);

		// console.log(resp);

		if(resp.records) {
			 _.each(resp.records, function (record, key){
			 	console.log('key:', key);
			 	_.each(record, function (value, key){
			 		console.log(key + ": ", value);
			 	});
			 });
		}		

		// var cdq  = resp.records[0];
		// cdq.ExampleField__c = 'node!';

		// org.update(cdq, oauth, function(err, resp){
		// 	if(err) console.log(err);
		// 	if(!err) console.log('It worked!', resp);
		// });


/*
		var cdq2 = nforce.createSObject('Client_Data_Questionnaire__c');
		cdq2.ExampleField__c = 'node123!';
		cdq2.Account__c = '0019000000E0sRiAAJ';

		console.log(cdq2);

		org.insert(cdq2, oauth, function(err, resp){
		  if(err) console.log(err);
	      if(!err) console.log('It worked!');
	    });

*/
	    // var acc = resp.records[0];
	    // acc.Name = 'Really Spiffy Cleaners';
	    // acc.Industry = 'Cleaners';
	    
	    // org.update(acc, oauth, function(err, resp){
	      // if(!err) console.log('It worked!');
	    // });
	    

	});
}