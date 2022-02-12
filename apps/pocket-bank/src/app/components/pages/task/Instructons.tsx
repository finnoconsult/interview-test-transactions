function Instructions() {
  return (
    <div className="min-h-screen">
      <h3 className="font-bold text-xl underline">Your tasks are:</h3>
      <ul className="list-disc list-inside">
        <li>
          Login Page
          <ul className="list-disc list-inside md:ml-6 text-gray-600">
            <li>Create a Login page layout</li>
            <li>Login form shall have username and password</li>
            <li>
              Post form data to endpoint <u>/api/login</u>
            </li>
            <li>Store authentication (JWT) data from response</li>
          </ul>
        </li>

        <li className="mt-4">
          Transaction list page
          <ul className="list-disc list-inside md:ml-6 text-gray-600">
            <li>Create page layout</li>
            <li>
              Retrieve transactions data from the server from{' '}
              <u>/api/banking/transaction</u> endpoint
              <p className="mt-4 text-black">
                Help of functional programming on Arrays
              </p>
              <ul className="list-disc list-inside md:ml-5">
                <li>Sort list by date descending</li>
                <li>
                  generate and add unique id for all items (range 1000-9999),
                  based on order
                </li>
                <li>
                  format nicely expenses with{' '}
                  <b style={{ color: '#e00000' }}>red</b> color, income as{' '}
                  <b style={{ color: 'green' }}>green</b>
                </li>
                <li>
                  aggregate sum of transaction amounts weekly(or monthly) based
                  on date (display, total sum, expense and income separately)
                </li>
              </ul>
            </li>
            <li className="mt-5">
              Create list render component
              <ul className="list-disc list-inside md:ml-6">
                <li>
                  Layout & behavior to be followed:
                  <a
                    href="https://github.com/finnoconsult/interview-test-transactions/blob/master/transaction-list-sample.mov"
                    target="_blank"
                    rel="noreferrer"
                  >
                    example
                  </a>
                </li>
                <li>
                  Apply weekly headers to transactions, and enlist all belonging
                  transactions underneath{' '}
                </li>
                <li>
                  Weekly headers shall be sticky on scroll, see{' '}
                  <a
                    href="https://github.com/finnoconsult/interview-test-transactions/blob/master/transaction-list-sample.mov"
                    target="_blank"
                    rel="noreferrer"
                  >
                    see video for reference
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <div className="mt-5 text-center">
        <a
          href="https://github.com/finnoconsult/interview-test-transactions/blob/master/README.md"
          target="_blank"
          rel="noreferrer"
          className="button"
        >
          Further info and instructions
        </a>
      </div>
    </div>
  );
}

export default Instructions;
