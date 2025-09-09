import {Box} from '@chakra-ui/react';
import {
  // Space,
  Table, Tag} from 'antd';

const { Column } = Table;

const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

// type DataType = {}

export const MeasurementCaseTable = () => {
  return (
    <Box>
      <Table dataSource={data}>
        <Column
          key="speaker"
          dataIndex="speaker"
          title="Динамик"
        />
        <Column title="Last Name" dataIndex="lastName" key="lastName" />
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={(tags: string[]) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          // render={(_: unknown, record: DataType) => (
          //   <Space size="middle">
          //     {/*<a>Invite {record.lastName}</a>*/}
          //     <a>Delete</a>
          //   </Space>
          // )}
        />
      </Table>
    </Box>
  )
}
