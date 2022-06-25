import axios from 'axios';

// Users

export const getUsers = () => {
	return axios({
         method: 'get',
         url:process.env.REACT_APP_BACK+'/users/users',
         auth: {
            username: process.env.REACT_APP_ID,
	    	password: process.env.REACT_APP_MDP
          }})
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);
	    })
}

export const getUser = user => {
	return axios({
         method: 'get',
         url:process.env.REACT_APP_BACK+'/users/user/'+user,
         auth: {
            username: process.env.REACT_APP_ID,
	    	password: process.env.REACT_APP_MDP
          }})
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);
	    })
}

export const register = user => {

	return axios({
          method: 'post',
          url: process.env.REACT_APP_BACK+'/users/register',
          data: {
            firstname: user.firstname,
            lastname: user.lastname,
            post_addr: user.post_addr,
            country: user.country,
            city: user.city,
            street_addr: user.street_addr,
            phone_number: user.phone_number,
            mail_addr: user.mail_addr,
            pwd: user.pwd,
            birth_date: user.birth_date,
            entreprise: user.entreprise,
            yearly_income: user.yearly_income,
            verified: user.verified,
            is_banned: user.is_banned
          },
          auth: {
            username: process.env.REACT_APP_ID,
	    	    password: process.env.REACT_APP_MDP
          },
        })
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);

	    })
}

export const profile = () => {
	
	return axios({
          method: 'get',
          url: process.env.REACT_APP_BACK+'/users/profile',
          headers:{
                Authorization : localStorage.getItem('usertoken')
          
         } })
	    .then(response => {
	      
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);
	      	
	    })


}

export const login = user => {
	
	return axios({
          method: 'post',
          url: process.env.REACT_APP_BACK+'/users/login',
          data: {
            mail_addr: user.mail_addr,
	      	  pwd: user.pwd
          },
          auth: {
            username: process.env.REACT_APP_ID,
	    	  password: process.env.REACT_APP_MDP
          },
        })
	    .then(response => {
	      	localStorage.setItem('usertoken', response.data);
	      
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);
	      	if(typeof err.response.status != undefined){
	      		if(err.response.status === 429){
	      			user.ok = 429;
	      	}
	      	if(err.response.status === 400){
	      			user.ok = 400;
	      	}
	      	if(err.response.status === 401){
	      			user.ok = 401;
	      	}
	      	}
	      	
	    })


}

export const upload = file => {

	var bodyFormData = new FormData();
	bodyFormData.append('file', file); 
	
	return axios({
          method: 'post',
          url: process.env.REACT_APP_BACK+'/users/upload/',
          data:bodyFormData,
          headers: {'Content-Type': 'multipart/form-data' },
          auth: {
            username: process.env.REACT_APP_ID,
	    	password: process.env.REACT_APP_MDP
          },
        })
	    .then(response => {  
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);
	      	
	    })


}

export const deleteUser = user => {
	return axios({
          method: 'delete',
          url: process.env.REACT_APP_BACK+'/users/delete_user/'+user.id,
          auth: {
            username: process.env.REACT_APP_ID,
	    	password: process.env.REACT_APP_MDP
          },
        })
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);
	    })
}


export const updateUser = user => {
	return axios({
          method: 'put',
          url: process.env.REACT_APP_BACK+'/users/update_user/'+user.id,
          data: {
            firstname: user.firstname,
            lastname: user.lastname,
            post_addr: user.post_addr,
            country: user.country,
            city: user.city,
            street_addr: user.street_addr,
            phone_number: user.phone_number,
            mail_addr: user.mail_addr,
            pwd: user.pwd,
            birth_date: user.birth_date,
            entreprise: user.entreprise,
            yearly_income: user.yearly_income,
            verified: user.verified,
            is_banned: user.is_banned
          },
          auth: {
            username: process.env.REACT_APP_ID,
	    	password: process.env.REACT_APP_MDP
          },
        })
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);

	    })
}

export const verify = user => {
	return axios({
          method: 'put',
          url: process.env.REACT_APP_BACK+'/users/verify_user/'+user.id,
          data: {
            verified: user.verified,
          },
          auth: {
            username: process.env.REACT_APP_ID,
	    	password: process.env.REACT_APP_MDP
          },
        })
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);

	    })
}

export const banUser = user => {
	return axios({
          method: 'put',
          url: process.env.REACT_APP_BACK+'/users/ban_user/'+user.mail_addr,
          data: {
            is_banned: user.is_banned
          },
          auth: {
            username: process.env.REACT_APP_ID,
	    	password: process.env.REACT_APP_MDP
          },
        })
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);

	    })
}


// Entreprises


export const banEtps = user => {
	return axios({
          method: 'put',
          url: process.env.REACT_APP_BACK+'/users/ban_etps/'+user.entreprise,
          data: {
            is_banned: user.is_banned
          },
          auth: {
            username: process.env.REACT_APP_ID,
	    	password: process.env.REACT_APP_MDP
          },
        })
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);

	    })
}


export const getEtps = () => {
	return axios({
         method: 'get',
         url:process.env.REACT_APP_BACK+'/users/etps',
         auth: {
            username: process.env.REACT_APP_ID,
	    	password: process.env.REACT_APP_MDP
          }})
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);
	    })
}

export const getEtpsId = etps => {
	return axios({
         method: 'get',
         url:process.env.REACT_APP_BACK+'/users/etps/'+etps,
         auth: {
            username: process.env.REACT_APP_ID,
	    	password: process.env.REACT_APP_MDP
          }})
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);
	    })
}

export const getEtpsName = etps => {
	return axios({
         method: 'get',
         url:process.env.REACT_APP_BACK+'/users/etpsByName/'+etps,
         auth: {
            username: process.env.REACT_APP_ID,
	    	password: process.env.REACT_APP_MDP
          }})
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);
	    })
}

export const createEtps = etps => {
	return axios({
          method: 'post',
          url: process.env.REACT_APP_BACK+'/users/createEtps',
          data: {
            access_code: etps.access_code,
            entreprise: etps.entreprise,
            is_banned: etps.is_banned
          },
          auth: {
            username: process.env.REACT_APP_ID,
	    	password: process.env.REACT_APP_MDP
          },
        })
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);

	    })
}

export const deleteEtp = etps => {
	return axios({
          method: 'delete',
          url: process.env.REACT_APP_BACK+'/users/etps/delete_etp/'+etps.id,
          auth: {
            username: process.env.REACT_APP_ID,
	    	password: process.env.REACT_APP_MDP
          },
        })
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);
	    })
}


export const updateEtp = etps => {
	return axios({
          method: 'put',
          url: process.env.REACT_APP_BACK+'/users/update_etp/'+etps.id,
          data: {
            access_code: etps.access_code,
            entreprise: etps.entreprise,
            is_banned: etps.is_banned
          },
          auth: {
            username: process.env.REACT_APP_ID,
	    	password: process.env.REACT_APP_MDP
          },
        })
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);

	    })
}


// Financing Plan



export const getF = () => {
	return axios({
         method: 'get',
         url:process.env.REACT_APP_BACK+'/users/financing_plans',
         auth: {
            username: process.env.REACT_APP_ID,
	    	password: process.env.REACT_APP_MDP
          }})
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);
	    })
}

export const getFPlan = financing_plan => {
	return axios({
         method: 'get',
         url:process.env.REACT_APP_BACK+'/users/financing_plan/'+financing_plan.id,
         auth: {
            username: process.env.REACT_APP_ID,
	    	password: process.env.REACT_APP_MDP
          }})
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);
	    })
}

export const createFPlan = financing_plan => {
  console.log(financing_plan)
	return axios({
          method: 'post',
          url: process.env.REACT_APP_BACK+'/users/create_financing_plan',
          data: {
            rate_interest: financing_plan.rate_interest,
            rate_insurance: financing_plan.rate_insurance,
            contribution: financing_plan.contribution,
            monthly_loan: financing_plan.monthly_loan,
            housing_price: financing_plan.housing_price,
            user_risk: financing_plan.user_risk,
            user_id: financing_plan.user_id,
            nft_id: financing_plan.nft_id,
            validate: financing_plan.validate,
            etps: financing_plan.etps
          },
          auth: {
            username: process.env.REACT_APP_ID,
	    	    password: process.env.REACT_APP_MDP
          },
        })
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);

	    })
}

export const deleteFPlan = financing_plan => {
	return axios({
          method: 'delete',
          url: process.env.REACT_APP_BACK+'/users/delete_financing_plan/'+financing_plan.id,
          auth: {
            username: process.env.REACT_APP_ID,
	    	password: process.env.REACT_APP_MDP
          },
        })
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);
	    })
}


export const updateFPlan = financing_plan => {
	return axios({
          method: 'put',
          url: process.env.REACT_APP_BACK+'/users/update_financing_plan/'+financing_plan.id,
          data: {
            rate_interest: financing_plan.rate_interest,
            rate_insurance: financing_plan.rate_insurance,
            contribution: financing_plan.contribution,
            monthly_loan: financing_plan.monthly_loan,
            housing_price: financing_plan.housing_price,
            user_risk: financing_plan.user_risk,
            user_id: financing_plan.user_id,
            nft_id: financing_plan.nft,
            validate: financing_plan.validate,
            etps: financing_plan.etps
          },
          auth: {
            username: process.env.REACT_APP_ID,
	    	password: process.env.REACT_APP_MDP
          },
        })
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);

	    })
}


export const validateFPlan = financing_plan => {
	return axios({
          method: 'put',
          url: process.env.REACT_APP_BACK+'/users/validate_financing_plan/'+financing_plan.id,
          data: {
            validate: financing_plan.validate,
          },
          auth: {
            username: process.env.REACT_APP_ID,
	    	password: process.env.REACT_APP_MDP
          },
        })
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);

	    })
}





// NFT


export const getNFTs = () => {
	return axios({
         method: 'get',
         url:process.env.REACT_APP_BACK+'/users/nfts',
         auth: {
            username: process.env.REACT_APP_ID,
	    	password: process.env.REACT_APP_MDP
          }})
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);
	    })
}


export const getNFT = nft => {
	return axios({
         method: 'get',
         url:process.env.REACT_APP_BACK+'/users/nft/'+nft,
         auth: {
            username: process.env.REACT_APP_ID,
	    	password: process.env.REACT_APP_MDP
          }})
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);
	    })
}

export const createNFT = nft => {
	return axios({
          method: 'post',
          url: process.env.REACT_APP_BACK+'/users/create_nft',
          data: {
            nftUri: nft.nftUri,
            creator_etps: nft.creator_etps,
            price: nft.price
          },
          auth: {
            username: process.env.REACT_APP_ID,
	    	    password: process.env.REACT_APP_MDP
          },
        })
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);

	    })
}


export const customGet = data => {
	return axios({
         method: 'get',
         url:data})
	    .then(response => {
	      return response.data;
	    })
	    .catch(err => {
	      	console.log(err);
	    })
}