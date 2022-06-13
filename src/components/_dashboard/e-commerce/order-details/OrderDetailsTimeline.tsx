// material
import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector
} from '@mui/lab';
// utils
import { fDateTime } from '../../../../utils/formatTime';
import { OrderDetailsLog } from '../../../../@types/order';

// ----------------------------------------------------------------------
type OrderDetailsTimelineProps = {
  orderDetailsLog: OrderDetailsLog[];
  timestamp: Date;
  status: string;
};

type OrderItemProps = {
  type: string;
  item: OrderDetailsLog;
  isLast: boolean;
};

function OrderItem({ type, item, isLast }: OrderItemProps) {
  const { status, description, created_at } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            (type === 'order1' && 'primary') ||
            (type === 'order2' && 'success') ||
            (type === 'order3' && 'info') ||
            (type === 'order4' && 'warning') ||
            'error'
          }
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">
          <b>{status}&nbsp;-&nbsp;</b>
          {description}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fDateTime(created_at)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

export default function OrderDetailsTimeline({ orderDetailsLog }: OrderDetailsTimelineProps) {
  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title="Timeline Pesanan" />
      <CardContent>
        <Timeline>
          {orderDetailsLog.map((item, index) => (
            <OrderItem
              key={item.id}
              item={item}
              type={'order' + (index % 5).toString()}
              isLast={index === orderDetailsLog.length - 1}
            />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
