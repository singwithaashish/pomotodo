import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { Box, Card, CardBody, Avatar, Text, Heading, Button } from 'grommet';
import Link from 'next/link';
import { useEffect, useState } from 'react';

 function Settings() {
  const { user, error, isLoading } = useUser();

  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && <Box align="center" pad="large">
      <Card height="medium" width="medium" background="light-1" elevation="medium" >
        <CardBody pad="medium" align="center">
          <Avatar src={user!.picture || ""} size="xlarge" round="full" />
          {/* <Heading level="2" margin={{ vertical: "medium" }}>{user.nickname}</Heading> */}
          <Text size="medium">{user.email}</Text>
          <Link href="/api/auth/logout">
            <Button label="Logout" margin={{ vertical: "medium" }} color={"red"} />
          </Link>
        </CardBody>
      </Card>
    </Box>
  );
}


export default Settings;