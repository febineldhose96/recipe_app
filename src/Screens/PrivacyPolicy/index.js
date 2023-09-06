// import React from "react";
// import "./styles.css";
// function PrivacyPolicy() {
//   return <div>Privacy PrivacyPolicy</div>;
// }

// export default PrivacyPolicy;
import React from "react";
import "../PrivacyPolicy/styles.css"; // Import your external CSS file
import IMAGE_ASSETS from "../../assets/images";

function PrivacyPolicy() {
  return (
    <div className="privacy-policy-container">
      <div className="privacy-policy-banner">
        <img src={IMAGE_ASSETS.policy_img} alt="Policies Banner" />
        <h1>Policies</h1>
      </div>
      <div className="privacy-policy-content">
        <p className="subtitle">View our policies in detail given below.</p>
        <h1 className="policy-title">Privacy Policy</h1>
        <h4>
          Last Updated: 6<sup>th</sup>September, 2023
        </h4>
        <p>
          Welcome to Chef Mate! At Chef Mate, we are committed to protecting
          your privacy. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you use our website and
          services.
        </p>
        <h3>Information We Collect</h3>
        <p className="subtitle">
          We may collect the following types of information from you:
        </p>

        <p>
          <b>Personal Information</b>: We may collect personal information such
          as your name, email address, and profile information when you create
          an account or interact with our services.
          <br />
          <b>User-Generated Content</b>: Any recipes, comments, or other content
          you share on our website will be collected and associated with your
          account.
          <br />
          <b>Usage Information</b>: We collect information about your
          interactions with our website, such as your browsing activity, search
          queries, and preferences.
          <br />
          <b>Device Information</b>: We may collect information about the device
          you use to access our website, including your device's unique
          identifiers and IP address.
        </p>
        <h3>How We Use Your Information</h3>
        <p className="subtitle">
          We use your information for the following purposes:
        </p>
        <p>
          <b>Providing and Improving Services</b>: We use your information to
          provide and improve our website and services, including personalized
          content and recommendations.
          <br />
          <b>Communications</b>: We may send you updates, newsletters, or
          service-related announcements via email or other communication
          methods.
          <br />
          <b>User-Generated Content</b>: Any recipes, comments, or other content
          you share on our website may be displayed publicly and used to enhance
          our services.
          <br />
          <b>Analytics</b>: We use data analytics to better understand how users
          interact with our website and to improve its performance and features.
        </p>
        <h3>Disclosure of Your Information</h3>
        <p className="subtitle">
          We may disclose your information to the following parties:
        </p>

        <p>
          <b>Service Providers</b>: We may share your information with
          third-party service providers who assist us in providing and
          maintaining our website and services.
          <br />
          <b>Legal Requirements</b>: We may disclose your information to comply
          with legal obligations, such as responding to subpoenas or court
          orders.
          <br />
          <b>With Your Consent</b>: We may share your information with third
          parties if you provide your consent.
        </p>
        <h3>Security</h3>
        <p>
          We take reasonable measures to protect your information from
          unauthorized access, disclosure, alteration, or destruction. However,
          no data transmission over the internet or storage system can be
          guaranteed to be 100% secure.
        </p>
        <h3>Your Choices</h3>
        <p>
          You can manage your account settings and privacy preferences by
          visiting your account profile. You have the right to access, correct,
          delete, or restrict the processing of your personal information.
        </p>
        <h3>Updates to this Privacy Policy</h3>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices and services. We will notify you of any significant
          changes through the website or via email.
        </p>
        <h3>Contact Us</h3>
        <p>
          If you have any questions about this Privacy Policy or our data
          practices, please contact us at 0756789767.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
