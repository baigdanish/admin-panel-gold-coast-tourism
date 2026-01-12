import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Button,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material";
import { QrCode2, Download, Print, CheckCircle } from "@mui/icons-material";

/* =====================
   DUMMY BOOKINGS
===================== */
interface Booking {
  id: number;
  bookingRef: string;
  tourName: string;
  travelDate: string;
  timeSlot: string;
  pickupLocation: string;
  transferType: "SIC" | "Private";
  adults: number;
  children: number;
  customerName: string;
  customerPhone: string;
}

interface Voucher {
  id: number;
  voucherNo: string;
  bookingRef: string;
  issuedDate: string;
  status: "valid" | "used" | "cancelled";
}

const dummyBookings: Booking[] = [
  {
    id: 1,
    bookingRef: "RYN-45872",
    tourName: "Dubai Desert Safari",
    travelDate: "2024-05-12",
    timeSlot: "Evening",
    pickupLocation: "Deira",
    transferType: "SIC",
    adults: 2,
    children: 1,
    customerName: "John Smith",
    customerPhone: "+971501234567",
  },
];

/* =====================
   MAIN COMPONENT
===================== */
const VoucherGenerator: React.FC = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const generateVoucher = (booking: Booking) => {
    const newVoucher: Voucher = {
      id: Date.now(),
      voucherNo: `VCH-${Math.floor(100000 + Math.random() * 900000)}`,
      bookingRef: booking.bookingRef,
      issuedDate: new Date().toISOString().split("T")[0],
      status: "valid",
    };

    setVouchers([...vouchers, newVoucher]);
    setSelectedBooking(booking);
    setOpenPreview(true);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Booking Vouchers
      </Typography>

      {/* BOOKINGS TABLE */}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Booking Ref</TableCell>
            <TableCell>Tour</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell align="center">Voucher</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyBookings.map((b) => (
            <TableRow key={b.id}>
              <TableCell>{b.bookingRef}</TableCell>
              <TableCell>{b.tourName}</TableCell>
              <TableCell>{b.travelDate}</TableCell>
              <TableCell>{b.customerName}</TableCell>
              <TableCell align="center">
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => generateVoucher(b)}
                >
                  Generate Voucher
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* =====================
          VOUCHER PREVIEW
      ====================== */}
      <Dialog open={openPreview} maxWidth="md" fullWidth>
        <DialogTitle>Booking Voucher</DialogTitle>
        <DialogContent>
          {selectedBooking && (
            <Paper
              sx={{
                p: 3,
                border: "2px dashed #1a237e",
                position: "relative",
              }}
            >
              <Stack spacing={2}>
                <Typography variant="h6" color="primary">
                  Gold Coast Tours – Booking Voucher
                </Typography>

                <Chip
                  icon={<CheckCircle />}
                  label="CONFIRMED"
                  color="success"
                  sx={{ width: "fit-content" }}
                />

                <Typography>
                  <strong>Booking Ref:</strong> {selectedBooking.bookingRef}
                </Typography>

                <Typography>
                  <strong>Tour:</strong> {selectedBooking.tourName}
                </Typography>

                <Typography>
                  <strong>Date:</strong> {selectedBooking.travelDate} |{" "}
                  {selectedBooking.timeSlot}
                </Typography>

                <Typography>
                  <strong>Pickup:</strong> {selectedBooking.pickupLocation}
                </Typography>

                <Typography>
                  <strong>Transfer:</strong> {selectedBooking.transferType}
                </Typography>

                <Typography>
                  <strong>Pax:</strong> Adults {selectedBooking.adults},
                  Children {selectedBooking.children}
                </Typography>

                <Typography>
                  <strong>Guest:</strong> {selectedBooking.customerName}
                </Typography>

                <Typography>
                  <strong>Emergency Contact:</strong>{" "}
                  {selectedBooking.customerPhone}
                </Typography>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={2}
                >
                  <Box>
                    <Typography variant="caption">
                      Voucher must be presented at pickup point
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      bgcolor: "#fff",
                      p: 1,
                      border: "1px solid #ccc",
                    }}
                  >
                    <QrCode2 sx={{ fontSize: 80 }} />
                  </Box>
                </Box>
              </Stack>
            </Paper>
          )}
        </DialogContent>

        <DialogActions>
          <Button startIcon={<Print />}>Print</Button>
          <Button startIcon={<Download />}>Download PDF</Button>
          <Button onClick={() => setOpenPreview(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default VoucherGenerator;
