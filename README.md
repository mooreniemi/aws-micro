# aws-micro

## arch

											 API Gateway
												 +
												 | AWS VPC
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
												 |    +------------------------------+
												 +    |SNS    |               |      |
															|       v               +      |
															|                              |
															|                              |
															+------------------------------+

