# aws-micro

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
