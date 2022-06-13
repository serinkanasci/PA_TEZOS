import axios from 'axios';
import Nft from '../../../api/models/Nft';

// Users

export const getUsers = () => {
	return axios({
         method: 'get',
         url:process.env.REACT_APP_API+'/users',
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
         url:process.env.REACT_APP_API+'/user/'+user.id,
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
          url: process.env.REACT_APP_API+'/register',
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
            public_key: user.public_key,
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

export const deleteUser = user => {
	return axios({
          method: 'delete',
          url: process.env.REACT_APP_API+'/delete_user/'+user.id,
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
          url: process.env.REACT_APP_API+'/update_user/'+user.id,
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
            public_key: user.public_key,
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
         url:process.env.REACT_APP_API+'/etps',
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
         url:process.env.REACT_APP_API+'/etp/'+etps.id,
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
          url: process.env.REACT_APP_API+'/createEtp',
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
          url: process.env.REACT_APP_API+'/etps/delete_etp/'+etps.id,
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
          url: process.env.REACT_APP_API+'/update_etp/'+etps.id,
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
         url:process.env.REACT_APP_API+'/financing_plans',
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
         url:process.env.REACT_APP_API+'/financing_plan/'+financing_plan.id,
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
          url: process.env.REACT_APP_API+'/create_financing_plan',
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
          url: process.env.REACT_APP_API+'/delete_financing_plan/'+financing_plan.id,
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
          url: process.env.REACT_APP_API+'/update_financing_plan/'+financing_plan.id,
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

// Agent



export const getAgents = () => {
	return axios({
         method: 'get',
         url:process.env.REACT_APP_API+'/user_agents',
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

export const getAgent = user_agent => {
	return axios({
         method: 'get',
         url:process.env.REACT_APP_API+'/user_agent/'+user_agent.id,
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

export const createAgent = user_agent => {

	return axios({
          method: 'post',
          url: process.env.REACT_APP_API+'/create_user_agent',
          data: {
            id: user_agent.id,
            firstname: user_agent.firstname,
            lastname: user_agent.lastname,
            phone_number: user_agent.phone_number,
            mail_addr: user_agent.mail_addr,
            pwd: user_agent.pwd,
            public_key: user_agent.public_key,
            entreprise: user_agent.entreprise,
            is_banned: user_agent.is_banned
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

export const deleteAgent = user_agent => {
	return axios({
          method: 'delete',
          url: process.env.REACT_APP_API+'/delete_user_agent/'+user_agent.id,
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


export const updateAgent = user_agent => {
	return axios({
          method: 'put',
          url: process.env.REACT_APP_API+'/user_agent/'+user_agent.id,
          data: {
            firstname: user_agent.firstname,
            lastname: user_agent.lastname,
            phone_number: user_agent.phone_number,
            mail_addr: user_agent.mail_addr,
            pwd: user_agent.pwd,
            public_key: user_agent.public_key,
            entreprise: user_agent.entreprise,
            is_banned: user_agent.is_banned
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
         url:process.env.REACT_APP_API+'/nfts',
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

export const getNFT = Nft => {
	return axios({
         method: 'get',
         url:process.env.REACT_APP_API+'/nft/'+Nft.nftId,
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

export const createNFT = Nft => {

	return axios({
          method: 'post',
          url: process.env.REACT_APP_API+'/create_nft',
          data: {
            id: Nft.id,
            nftId: Nft.nftId,
            creator_etps: Nft.creator_etps,
            price: Nft.price
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

export const deleteNFT = Nft => {
	return axios({
          method: 'delete',
          url: process.env.REACT_APP_API+'/delete_nft/'+Nft.nftId,
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


export const updateNFT = Nft => {
	return axios({
          method: 'put',
          url: process.env.REACT_APP_API+'/nft/'+Nft.nftId,
          data: {
            nftId: Nft.nftId,
            creator_etps: Nft.creator_etps,
            price: Nft.price
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