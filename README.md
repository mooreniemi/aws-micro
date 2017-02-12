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

Stuff we'll need to setup on AWS:

- RDS
- SNS
- User with the right permissions
- Lambda execution role

Let's assume you have an [AWS account setup](http://docs.aws.amazon.com/lambda/latest/dg/setup.html), such that you have an `ACCESS_KEY` and `SECRET_ACCESS_KEY` and appropriate role permissions on that user.

For use with [node-lambda](https://www.npmjs.com/package/node-lambda) you'll want the cli too, which is downloaded via `pip install awscli`.

## usage

To hit the endpoint, you can use `./snsProducer/bin/test.sh` from the project root.
