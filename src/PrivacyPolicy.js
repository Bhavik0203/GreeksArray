import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import banner7 from './assets/Images/banners/Banner1.jpg'

const PrivacyPolicy = () => {
    return (
        <>
            <Header />
            <div className="mb-8 ">
                <img
                    src={banner7} // Ensure this matches the imported 'about' image
                    alt="Banner"
                     className="w-full h-[300px] object-cover"
                />
            </div>
            {/* Wrapper for centering content */}
            <div className="mb-8 mt-8 " style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                <h1 className="mb-8 mt-8 text-xl font-bold">Privacy Policy - GeeksArray</h1>
                <p>
                    At GeeksArray.com, we take absolute care of your information which you give us while registering on the website.
                    We do not share that information with other entities. Your passwords are stored in encrypted mode and except you,
                    no one else including GeeksArray.com can understand it. We do our best to keep your trust by using the information
                    about you carefully and sensibly. This privacy notice explains our privacy policy. By visiting GeeksArray.com,
                    you are accepting this privacy policy.
                </p>
<br/>
                <h2 className='font-bold'>How do we use the information that we gather?</h2>
                <p>
                    GeeksArray.com is a free community site and we do not publish your private details like Email. We do not share or sell your
                    personal information to any third parties. However, all personal information you submit as part of your public profile will
                    be publicly accessible on the site.
                </p>
                <br/>
                <h2 className='font-bold'>What kind of information do we gather?</h2>
                <p>
                    We store any information you submit to our site. This includes, but is not limited to, the profile you create at the time of
                    registration, the comments you make, and anything you might have written about blogs.
                </p>
                <br/>
                <h2 className='font-bold'>General visitor information</h2>
                <p>
                    For statistical purposes, we gather and store general visitor information like IP address, browser version, visiting time,
                    duration, etc. We may share such information with third parties or publish it on our site for marketing purposes.
                </p>
                <br/>
                <h2 className='font-bold'>Browser Cookies</h2>
                <p>
                    Browser Cookies are small pieces of information which get stored in your browser. When you login to GeeksArray.com, we store small cookies in your computer, to provide a better browsing experience for you.
                    <br />
                    We may use third-party advertising companies to serve ads when you visit our website. These companies may use non personal information about your visits to this and other websites in order to provide advertisements about goods and services of interests you.
                    <br />
                    If you would like more information about this practice and to know your choices about options made available by these companies click here.
                </p>
                <br/>
                <h2 className='font-bold'>Advertisements</h2>
                <p>
                    We may use advertisements from third party companies. We try to avoid any kind of offensive and harmful advertisements in our site, but in many cases we do not have complete control of which advertisements appear in our site, due to the fact that many advertisements are automatically served by third party advertisers. We will not be responsible for any harm caused by such advertisements. However, if such issues are directed to us, we will do all possible solutions to avoid such things from GeeksArray.
                </p>
                <br/>
                <h2 className='font-bold'>Business Transfers</h2>
                <p>
                    As we continue to develop and grow our web site, We may sell GeeksArray.com with full or partial transfer to new entity. In such transactions, member information may be transferred to new entity.
                </p>
                <br/>
            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;

