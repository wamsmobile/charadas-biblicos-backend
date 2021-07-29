'use strict'

const PORT = process.env.PORT || 3001 
const Google = {
  type: "service_account",
  project_id: "charadas-max",
  private_key_id: "655a1d27b6c99001b11ee92e546888646eda8d3c",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDQT99Kxn99isu6\nTTmfFOHHfZrJkFj+M2bXMRzqswuosxzs8kxPfBQSXhGwsh7zlOEZiZrmut+AQ30u\nlEML+JzVQQZgSczAmjk6ir5TLY7c8u7sSOTpi9jG+UnEK3bnHMjruMESm4giaGLq\nAB46lWaAbS3upQvhDr5SB4PGf96/h17k7sxRRzHw6S7/kfc+bjYsi9RyrfHxvF6s\niBmCPOlwNLi9P7ZaOFr22d3LAmzw/oweyQi8k7D5P5YKS1FdlYxVVJEn+LB0H5+x\nIYJ8ZYvnRzfpY8f+MorRk4ApjT4Bn40S0F8MGQwfBIzlAc2m17NB6b+9waFcNBtj\nHnJNs2VLAgMBAAECggEABYEfVNJ+M2SjxPXRKyrzsJ4MPuQMwsAij4nsKBZrnT9v\ncZFEaVdnEF/Z1J21oYf2pFe1boixlZj/vLzzhnV0XmOKAsrwbqiTiGslUrkTDu9N\neXH1yXgwiSbFtlv2D0zJSMJXbQxQIFAYN687P2Mt6SKTBKvY3ZOwSiZWjRFIL+qT\n3RQkXKWu7fUcjhRMALudPjj7xHC6nsJRsQUBgjgB6Zx5UK8LOIB6OwggByN99N5K\nnZIUPeSs2uqRQJDz6o7CEzmON8VpvHGohNhvWBMxfcdhpE2pTcHrKKtEqS5f4gop\nw65x/7Uh4896ojFVKbbBeFMQUWebPKfIBVrF05hjAQKBgQDv4yOF22EB6XhI0ha3\n9gxWMm9n6/2jXpi3gqUV6/J9C3WLltFq2AITu5XVlhxR6ApRCyepLXXDjoMUQmm1\nPEv14lE+mQY89cRWjqhZJie9oGz6e52uIUOOkhgLyB2LTn8BjexV3Iv1cLKAJ9pZ\n7qOn5MVn5y/dUenJmhUjpfwL8QKBgQDeTcwCJUG/D+kTv+w8QLZgnLV6OzP0TCkv\nJUUdKuuYszJTfklfIO0aZ045MpCtE3FZuikHavNXNFeGXQoufmYTCrhd87jpAk8y\n4skeYZ0heBQd5jCTe+AvbZnPLfoQ7vsp1k22M58kz9zOILJ3htIf/6y5Qc5C0aE4\nviMrkz6w+wKBgAx2o6jXvhGIXMyDxdRm/zsXQbyHgVUUnCCktAkQije++at3+Ydw\nk6MM0vsW4n/K64ZMaxIaH406gUrzLGTTLisnSAtVjgJqznmkzdBb8CKlDCRzebzL\nU6Q7qO4rxoUvXd/pzMalP8xPv6Zy66BSisQ1WaBNXapFED1+OOzyOccxAoGAfFy7\nT0v2buOAuZq5lq+BF6UzZRDvrLBardREyN9083T0J39TnpM18XpvaVIfW6Ov2slp\nIIw1W8idWj58bqwpgGeT4oNxI3E2SzpR1tw24j1hy6Q18pvvO7ktvZhz97sp6SrJ\nSK+yTQ638Nyb2oAi1uHah70HnZvWfH7p//ucq7cCgYA/zwFPC2mO52VKyi18a4qU\n61jMJQWWCgiaXSNtfJgbkw7u2ImpWzTxcGC1Hf9Ir94EiUu7T4Q8gBx/ZEKxyxPL\nDnzZkY3FGTXkrLD8fUwY4GK7zrZJFBlkWDawhs26RUJ+pbnikfh3x3KVAMDIIS/j\n195sE0NMAfBCsf4BdwXgOQ==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-0o6ss@charadas-max.iam.gserviceaccount.com",
  client_id: "117544464766739394758",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-0o6ss%40charadas-max.iam.gserviceaccount.com"
}

module.exports={
  PORT: PORT,
  Google: Google,
  TOKEN_SECRETO: '1234qwerwams #$%.-',
  BASEDEDATOS: process.env.MONGODB || 'mongodb://localhost/CharadasMax',
  UrlBackend: `https://charadas.wewams.com/static/`
}
