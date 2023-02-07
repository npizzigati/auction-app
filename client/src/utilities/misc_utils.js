'use strict';

import axios from '../axiosWithConfig.js';

export default async function authenticate (redirect, setRole, navigate) {
  await axios.get('api/v1/sessions/get-role', { headers: { Authenticate: localStorage.token } })
    .then(res => {
      const role = res.data;
      if (role === 'admin') {
        setRole && setRole(role);
        redirect.signedInRedirect && navigate(redirect.signedInRedirect);
      } else if (role === 'regular') {
        setRole && setRole(role);
        redirect.signedInRedirect && navigate(redirect.signedInRedirect);
        redirect.notAdminRedirect && navigate(redirect.notAdminRedirect);
      } else {
        redirect.notSignedInRedirect && navigate(redirect.notSignedInRedirect);
      }
    });
}
