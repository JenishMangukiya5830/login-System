const Admin = require('../model/AdminModel');

module.exports.get = (req,res) => {
    res.render('Register')
}

module.exports.insert = async (req,res) => {
    try{
        if(req.body.name != '') 
        {
            if(req.body.email != '')
            {
                if(req.body.username != '')
                {
                    if(req.body.password != '')
                    {
                        if(req.body.password.length >= 6)
                        {
                            let insertData = await Admin.create({
                                name : req.body.name,
                                email : req.body.email,
                                username : req.body.username,
                                password : req.body.password
                            });
                    
                            if(insertData)
                            {
                                req.flash('success','Data Inserted Successfully');
                                res.redirect('/login');
                            }
                            else{
                                req.flash('error','Data not Inserted');
                                res.redirect('/')
                            }
                        }
                        else
                        {
                            req.flash('error','Please Enter Minimum 6 Letter')
                            res.redirect('/')
                        }
                    }
                    else
                    {
                        req.flash('error',"Please Enter Password")
                        res.redirect('/')
                    }
                }
                else
                {
                    req.flash('error',"Please Enter Username")
                    res.redirect('/')
                }
            }
            else
            {
                req.flash('error',"Please Enter Your Email Id")
                res.redirect('/')
            }
        }
        else
        {
            req.flash('error',"Please Enter Your Name")
            res.redirect('/');
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports.login = (req,res) => {
    res.render('login')
}

module.exports.loginData = (req,res) => {
    res.redirect('/index')
}

module.exports.index = (req,res) => {
    res.render('index')
}

module.exports.logout = (req,res,next) => {

    req.logout((err) => {
        if(err)
        {
            return next(err);
        }
        res.redirect('/login')
    })

}
