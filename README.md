# aws-micro

An extremely simple demo project showing an APIGateway -> Lambda -> SNS -> Lambda -> RDS pipeline.

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



## usage

To hit the endpoint, you can use `./snsProducer/bin/test.sh` from the project root.
