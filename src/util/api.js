const LSKEY = 'chaincart-data'

let url
const loc = window.location
if (loc.hostname === 'localhost') {
  url = `${loc.protocol}//${loc.hostname}:3001`
} else {
  url = `${loc.protocol}//api.${loc.host}`
}

async function ajax (u, data, opts, isRetry) {
  if (!u.startsWith('/')) console.warn(`ajax url should start with '/' (was given ${u})`)
  let keyData = window.localStorage.getItem(LSKEY)
  if (!keyData) throw new Error('missing key data')
  keyData = JSON.parse(keyData)
  if (!keyData.access_token) throw new Error('missing access token')

  const res = await fetch(url + u, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + keyData.access_token
    },
    body: data ? JSON.stringify(data) : undefined,
    ...opts
  })

  if (res.status.toString().startsWith('2')) {
    return await res.json()
  } else {
    if (isRetry) return {
      error: 'token refresh failed'
    }
    const json = await res.json()
    if (json.message && json.message.indexOf('authorization') > -1) {
      return await doRetry(u, data, opts)
    } else {
      throw new Error(json.message || res.status)
    }
  }
}

async function doRetry (u, data, opts) {
  let keyData = window.localStorage.getItem(LSKEY)
  if (!keyData) throw new Error('missing key data')
  keyData = JSON.parse(keyData)
  if (!keyData.refresh_token) throw new Error('missing refresh token')

  const res = await fetch(url + '/token', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token: keyData.refresh_token
    })
  })

  if (res.status.toString().startsWith('2')) {
    const tokens = await res.json()
    window.localStorage.setItem(LSKEY, JSON.stringify({
      ...JSON.parse(window.localStorage.getItem(LSKEY)),
      ...tokens
    }))
    // console.log(u, data, opts)
    return await ajax(u, data, opts, true)
  } else {
    return {
      error: res.status,
      json: await res.json()
    }
  }
}

export default {
  ajax,
  async get (u, data, opts = {}) {
    return await ajax(u, data, {
      ...opts,
      method: 'GET'
    })
  },
  async post (u, data, opts = {}) {
    return await ajax(u, data, {
      ...opts,
      method: 'POST'
    })
  },
  async delete (u, data, opts = {}) {
    return await ajax(u, data, {
      ...opts,
      method: 'DELETE'
    })
  },
  async patch (u, data, opts = {}) {
    return await ajax(u, data, {
      ...opts,
      method: 'PATCH'
    })
  }
}
