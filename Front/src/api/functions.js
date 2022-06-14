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
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            post_addr: user.post_addr,
            country: user.country,
            city: user.city,
            street_addr: user.street_addr,
            phone_number: user.phone_number,
            mail_addr: user.mail_addr,
            pwd: user.pwd,
            mensuality: user.mensuality,
            birth_date: user.birth_date,
            entreprise: user.entreprise,
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
            mensuality: user.mensuality,
            birth_date: user.birth_date,
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

export const getEtp = etps => {
	return axios({
         method: 'get',
         url:process.env.REACT_APP_BACK+'/users/etp/'+etps.id,
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

export const createEtp = etps => {
	return axios({
          method: 'post',
          url: process.env.REACT_APP_BACK+'/users/createEtp',
          data: {
            id: etps.id,
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



export const getFPlans = () => {
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
	return axios({
          method: 'post',
          url: process.env.REACT_APP_BACK+'/users/create_financing_plan',
          data: {
            id: financing_plan.id,
            rate_interest: financing_plan.rate_interest,
            rate_insurance: financing_plan.rate_insurance,
            yearly_income: financing_plan.yearly_income,
            contribution: financing_plan.contribution,
            monthly_loan: financing_plan.monthly_loan,
            housing_price: financing_plan.housing_price,
            user_risk: financing_plan.user_risk,
            age: financing_plan.age
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
            yearly_income: financing_plan.yearly_income,
            contribution: financing_plan.contribution,
            monthly_loan: financing_plan.monthly_loan,
            housing_price: financing_plan.housing_price,
            user_risk: financing_plan.user_risk,
            age: financing_plan.age
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