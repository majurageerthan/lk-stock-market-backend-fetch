export AWS_ACCESS_KEY_ID=AKIASJAOCGSKSZDLRSPC
export AWS_SECRET_ACCESS_KEY=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
# AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are now available for serverless to use
cp .env.prod .env
rm -rf .serverless/
sleep 2
serverless deploy --stage production
# serverless remove --stage production

# 'export' command is valid only for unix shells
# In Windows use 'set' instead of 'export'