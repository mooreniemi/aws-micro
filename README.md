# aws-micro

An extremely simple demo project showing an APIGateway -> Lambda -> SNS -> Lambda -> RDS pipeline, largely following [this tutorial on AWS](http://docs.aws.amazon.com/sns/latest/dg/sns-lambda.html).

Microservice frameworks often use brokers to achieve async communication between microservices. On AWS, we can use [SNS](https://aws.amazon.com/sns/) as our broker. In this demo, a client can POST a message to our API. A lambda function (snsProducer) then publishes a message on a topic (keyed by an ARN) on SNS. Another lambda (snsConsumer) is subscribed to the topic, and pulls the message off to be saved into a relational database.

## arch

                      API Gateway
                         +
                         |  VPC
    client               | +-------------------------------------------------------+
    +----------------+   | | +--------------+  +--------------+  +---------------+ |
    |                |   | | |snsProducer   |  |snsConsumer   |  |RDS            | |
    |                |   | | |              |  |              |  |               | |
    |          +--------------->            |  |              |  |               | |
    |                |   | | |        +     |  |      ^    +------------>        | |
    |         <---------------+       |     |  |      |       |  |               | |
    |                |   | | |        |     |  |      |    <-----------+         | |
    |                |   | | |        |     |  |      |       |  |               | |
    |                |   | | |        |     |  |      |       |  |               | |
    +----------------+   | | +--------------+  +--------------+  +---------------+ |
                         | +-------------------------------------------------------+
                         |   +--------------------------------+
                         +   |SNS     |               |       |
                             |        v               +       |
                             |                                |
                             |                                |
                             +--------------------------------+


## setup

Stuff you want to customize from my setup is consolidated into `awsConstants.js`.

Stuff we'll need to setup on AWS:

- [User with the right permissions](http://docs.aws.amazon.com/lambda/latest/dg/setup.html)
- [RDS](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.MySQL.html#CHAP_GettingStarted.Creating.MySQL) (see also `aws.sh` for a sample rds initialization via cli)
- [VPC must have DNS hostname turned on, for EC2](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-vpc.html) (if you're using default VPC you should be good)
- [EC2](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.Scenarios.html) for tunneling through to our RDS
- migration on RDS, via `setup.sql`
- [SNS](http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/US_SetupSNS.html)
- Lambda & RDS should be in the same security group
- [Lambda execution role](http://docs.aws.amazon.com/lambda/latest/dg/with-s3-example-create-iam-role.html)

Stuff we'll need to setup locally:

- [awscli](http://docs.aws.amazon.com/cli/latest/userguide/installing.html)
- aws credentials via `aws --configure` using credentials from user setup
- [node-lambda](https://www.npmjs.com/package/node-lambda)
- `npm install` in `snsConsumer` and `snsProducer` directories
- RDS credentials (environment vars) and SNS topic ARN (`awsConstants.js`)

## usage

To hit the endpoint, you can use `./snsProducer/bin/test.sh` from the project root.
