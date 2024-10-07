import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Termsandcodition = () => {
  return (
    <>
      <Header />
      <div
        style={{
          padding: "20px",
          lineHeight: "1.6",
          justifyContent: "normal",
          textJustify: "inter-word", // Justify text alignment
          marginTop: "50px", // Add space above the content
          maxWidth: "1100px", // Optional: restrict the max width for better readability
          margin: "50px auto", // Center horizontally and add margin at top
        }}
      >
        <h1 className=" text-2xl font-bold mt-4 mb-2">Terms and Condition</h1>
        <p className="text-lg text-justify">
          Thanks for using GeeksArray. Our mission is to deepen people’s
          understanding of the world and spread ideas that matter.
        </p>
        <p className="text-lg text-justify">
          These Terms of Service (“Terms”) apply to your access to and use of
          the websites, mobile applications, and other online products and
          services (collectively, the “Services”) provided by GeeksArray
          Technologies (“GeeksArray” or “we”). By clicking your consent (e.g.
          “Continue,” “Sign-in,” or “Sign-up,”) or by using our Services, you
          agree to these Terms, including the mandatory arbitration provision
          and class action waiver in the Resolving Disputes; Binding Arbitration
          Section.
        </p>
        <p className="text-lg text-justify">
          Our Privacy Policy explains how we collect and use your information,
          while our Rules outline your responsibilities when using our Services.
          By using our Services, you’re agreeing to be bound by these Terms and
          our Rules. Please see our Privacy Policy for information about how we
          collect, use, share, and otherwise process information about you.
        </p>
        <p className="text-lg text-justify">
          If you have any questions about these Terms or our Services, please
          contact us at legal@geeksarray.com.
        </p>
        <h2 className="text-2xl font-bold mt-4 mb-2">
          Your Account and Responsibilities
        </h2>
        {/* The rest of the existing Medium content */}
        <p className="text-lg text-justify">
          You're responsible for your use of the Services and any content you
          provide, including compliance with applicable laws. Content on the
          Services may be protected by others' intellectual property rights.
          Please don't copy, upload, download, or share content unless you have
          the right to do so.
        </p>
        {/* New section for GeeksArray.com */}
        <h2 className=" text-2xl font-bold mt-4 mb-2">
          Your use of the Services must comply with our Rules.
        </h2>
        <p className="text-lg text-justify">
          You may need to register for an account to access some or all of our
          Services. Help us keep your account protected. Safeguard your password
          to the account, and keep your account information current. We
          recommend that you do not share your password with others.
        </p>
        <p className="text-lg text-justify">
          If you're accepting these Terms and using the Services on behalf of
          someone else (such as another person or entity), you represent that
          you're authorized to do so, and in that case, the words "you" or
          "your" in these Terms include that other person or entity.
        </p>
        <h3 className=" text-2xl font-bold mt-4 mb-2">
          To use our Services, you must be at least 13 years old.
        </h3>
        <p className="text-lg text-justify">
          If you use the Services to access, collect, or use personal
          information about other GeeksArray users (“Personal Information”), you
          agree to do so in compliance with applicable laws.
        </p>
        <p className="text-lg text-justify">
          You further agree not to sell any Personal Information, where the term
          “sell” has the meaning given to it under applicable laws.
        </p>
        <p className="text-lg text-justify">
          For Personal Information you provide to us (e.g. as a Newsletter
          Editor), you represent and warrant that you have lawfully collected
          the Personal Information and that you or a third party has provided
          all required notices and collected all required consents before
          collecting the Personal Information. You further represent and warrant
          that GeeksArray’s use of such Personal Information in accordance with
          the purposes for which you provided us the Personal Information will
          not violate, misappropriate, or infringe any rights of another
          (including intellectual property rights or privacy rights) and will
          not cause us to violate any applicable laws.
        </p>
        <h3 className=" text-2xl font-bold mt-4 mb-2">
          User Content on the Services
        </h3>
        <p className="text-lg text-justify">
          GeeksArray may review your conduct and content for compliance with
          these Terms and our Rules and reserves the right to remove any
          violating content.
        </p>
        <p className="text-lg text-justify">
          GeeksArray reserves the right to delete or disable content alleged to
          be infringing the intellectual property rights of others and to
          terminate accounts of repeat infringers. We respond to notices of
          alleged copyright infringement if they comply with the law; please
          report such notices using our Copyright Policy.
        </p>
        <h3 className=" text-2xl font-bold mt-4 mb-2">Rights and Ownership</h3>
        <p className="text-lg text-justify">
          Unless otherwise agreed in writing, by submitting, posting, or
          displaying content on or through the Services, you grant GeeksArray a
          nonexclusive, royalty-free, worldwide, fully paid, and sublicensable
          license to use, reproduce, modify, adapt, publish, translate, create
          derivative works from, distribute, publicly perform, and display your
          content and any name, username, or likeness provided in connection
          with your content in all media formats and distribution methods now
          known or later developed on the Services.
        </p>
        <p className="text-lg text-justify">
          GeeksArray needs this license because you own your content, and
          GeeksArray can’t display it across its various surfaces (i.e., mobile,
          web) without your permission.
        </p>
        <p className="text-lg text-justify">
          This type of license also is needed to distribute your content across
          our Services. For example, you post a story on GeeksArray. It is
          reproduced as versions on both our website and app and distributed to
          multiple places within GeeksArray, such as the homepage or reading
          lists. A modification might be that we show a snippet of your work
          (and not the full post) in a preview, with attribution to you. A
          derivative work might be a list of top authors or quotes on GeeksArray
          that uses portions of your content, again with full attribution. This
          license applies to our Services only and does not grant us any
          permissions outside of our Services.
        </p>
        <h3 className=" text-2xl font-bold mt-4 mb-2">Termination</h3>
        <p className="text-lg text-justify">
          You’re free to stop using our Services at any time. We reserve the
          right to suspend or terminate your access to the Services with or
          without notice.
        </p>
        <h3 className=" text-2xl font-bold mt-4 mb-2">
          Transfer and Processing Data
        </h3>
        <p className="text-lg text-justify">
          In order for us to provide our Services, you agree that we may
          process, transfer, and store information about you in India and other
          countries, where you may not have the same rights and protections as
          you do under local law.
        </p>
        <h3 className=" text-2xl font-bold mt-4 mb-2">Indemnification</h3>
        <p className="text-lg text-justify">
          To the fullest extent permitted by applicable law, you will indemnify,
          defend, and hold harmless GeeksArray, and our officers, directors,
          agents, partners, and employees (individually and collectively, the
          “GeeksArray Parties”) from and against any losses, liabilities,
          claims, demands, damages, expenses, or costs (“Claims”) arising out of
          or related to your violation, misappropriation, or infringement of any
          rights of another (including intellectual property rights or privacy
          rights) or your violation of the law. You agree to promptly notify
          GeeksArray Parties of any third-party Claims, cooperate with
          GeeksArray Parties in defending such Claims, and pay all fees, costs,
          and expenses associated with defending such Claims (including
          attorneys’ fees). You also agree that the GeeksArray Parties will have
          control of the defense or settlement, at GeeksArray’s sole option, of
          any third-party Claims.
        </p>
        <h3 className="text-2xl font-bold mt-4 mb-2">
          Governing Law and Venue
        </h3>
        <p className="text-lg text-justify">
          These Terms and any dispute that arises between you and GeeksArray
          will be governed by Indian law except for its conflict of law
          principles. Any dispute between the parties that’s not subject to
          arbitration or can’t be heard in small claims court will be resolved
          in the courts of India.
        </p>
        <p className="text-lg text-justify">
          Some countries have laws that require agreements to be governed by the
          local laws of the consumer’s country. This paragraph doesn’t override
          those laws.
        </p>{" "}
      </div>
      <Footer />
    </>
  );
};

export default Termsandcodition;
