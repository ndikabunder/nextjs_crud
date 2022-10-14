import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { useState } from 'react';
import { InputForm } from '../components/input';

export default function Home() {
  const [clients, setClients] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState(null);

  const [errors, setErrors] = useState({ name: null, email: null });

  const isValidate = () => {
    if (!name) {
      setErrors({ name: 'Name is required' });
      return false;
    }

    if (!email) {
      setErrors({ email: 'Email is required' });
      return false;
    }

    if (clients.some((client) => client.email === email && client._id !== id)) {
      setErrors({ email: 'Email already in use' });
      return;
    }

    setErrors({});
    return true;
  };

  const handleCreate = (e) => {
    e.preventDefault();

    if (!isValidate()) return;

    setClients(
      clients.concat({
        _id: new Date().getMilliseconds().toString(),
        name,
        email,
      })
    );

    setName('');
    setEmail('');
    toggleForm();
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!isValidate()) return;

    setClients(
      clients.map((client) =>
        client._id === id ? { name, email, _id: id } : client
      )
    );

    setName('');
    setEmail('');
    setId(null);
    toggleForm();
  };

  const handleDelete = (_id) => {
    setClients(clients.filter((client) => client._id !== _id));
  };

  const handleShowContact = (client) => {
    setId(client._id);
    setName(client.name);
    setEmail(client.email);
    setIsFormOpen(true);
  };

  const handleChangeName = (text) => {
    setName(text);
  };

  const handleChangeEmail = (text) => {
    setEmail(text);
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <Box margin='4'>
      <Flex color='white' justifyContent='space-between'>
        <Text color='black' fontSize='2xl'>
          Contact List
        </Text>
        <Button colorScheme='blue' onClick={toggleForm}>
          {isFormOpen ? '-' : '+'}
        </Button>
      </Flex>

      {isFormOpen && (
        <VStack
          marginY='1rem'
          as='form'
          onSubmit={id ? handleUpdate : handleCreate}
        >
          <InputForm
            label='Full name'
            name='name'
            value={name}
            onChange={(e) => handleChangeName(e.target.value)}
            error={errors.name}
          />

          <InputForm
            label='Email address'
            name='email'
            type='email'
            value={email}
            onChange={(e) => handleChangeEmail(e.target.value)}
            error={errors.email}
          />

          <Button
            fontSize='sm'
            alignSelf='flex-end'
            colorScheme='blue'
            type='submit'
          >
            {id ? 'Update Contact' : 'Add Contact'}
          </Button>
        </VStack>
      )}
      <TableContainer my='4'>
        <Table variant='simple'>
          <Thead bgColor='blue.300'>
            <Tr>
              <Th textColor='white'>Name</Th>
              <Th textColor='white'>Email</Th>
              <Th textColor='white'>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {clients.map((client, index) => {
              return (
                <Tr key={index}>
                  <Td>{client.name}</Td>
                  <Td>{client.email}</Td>
                  <Td>
                    <Flex>
                      <Button
                        size='sm'
                        fontSize='smaller'
                        colorScheme='yellow'
                        mr='2'
                        onClick={() => handleShowContact(client)}
                      >
                        Edit
                      </Button>
                      <Button
                        size='sm'
                        fontSize='smaller'
                        colorScheme='red'
                        onClick={() => handleDelete(client._id)}
                      >
                        Remove
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
