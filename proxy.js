module.exports = {
  '/api': {
    target: 'https://m.weibo.cn',
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: {
      '^/comments': '/api/comments'
      // '/api/msg': '/msg'
    },
    headers: {
      Cookie: 'ALF=1546407067; _T_WM=e03434bfe2d8ea7e8f8b2c92bfae22b0; SCF=Aq3vwpdMpDT-JLFrHepOpIy9L10bQUmNHUYkcvhl29kSrltLdlwEPMFbycC9J7kGRX-xceItpdZYj_8HtZiRCQY.; SUB=_2A25xAZpiDeRhGeVG6lIW9yzOwzSIHXVSDSYqrDV6PUJbktANLRSjkW1NT9WMo6CH65oTne0i-6rI_yVC5KY84bDF; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WWPacEyh197c.LG8f.FhaGd5JpX5K-hUgL.FoeReK5NS0zE1hn2dJLoI0YLxKnLB.2LB-zLxK-L1-eLBKnLxKML12-LBo5LxK-LB--L1--LxKqLBoBLB.zLxK-L1-eLBKnLxKqLBKzLBKqt; SUHB=0G0uh6ld3zV-Ab; SSOLoginState=1543891506; MLOGIN=1; M_WEIBOCN_PARAMS=luicode%3D20000174%26uicode%3D20000174'
    }
  }
}
