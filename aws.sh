# http://docs.aws.amazon.com/cli/latest/reference/rds/create-db-instance.html
aws rds create-db-instance     --db-instance-identifier awsMicro --db-instance-class db.t2.micro     --engine MySQL     --allocated-storage 5     --no-publicly-accessible     --db-name lambda     --master-username adminuser     --master-user-password mypassword     --backup-retention-period 3

# http://docs.aws.amazon.com/cli/latest/reference/sns/create-topic.html
aws sns create-topic --name hi-lambda
