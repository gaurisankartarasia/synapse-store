'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

type Address = {
  id?: string;
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
};

export default function AddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [open, setOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const fetchAddresses = async () => {
    const res = await fetch('/api/v1/user/addresses');
    const data = await res.json();
    if (res.ok) setAddresses(data.addresses || []);
  };

  const saveAddress = async () => {
    const res = await fetch('/api/v1/user/addresses', {
      method: 'POST',
      body: JSON.stringify(editingAddress),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      setOpen(false);
      setEditingAddress(null);
      fetchAddresses();
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">My Addresses</h1>
        <Dialog open={open} onOpenChange={setOpen}  >
          <DialogTrigger asChild>
            <Button onClick={() => setEditingAddress({ fullName: '', phoneNumber:'', street: '', city: '', postalCode: '', country: '' })}>
              Add Address
            </Button>
          </DialogTrigger>
          <DialogContent  className='min-w-[800px]' >
            <DialogHeader>
              <DialogTitle>{editingAddress?.id ? 'Edit Address' : 'New Address'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  value={editingAddress?.fullName || ''}
                  onChange={(e) => setEditingAddress({ ...editingAddress!, fullName: e.target.value })}
                />
              </div>
              <div>
                <Label>Phone Number ( Required )</Label>
                <Input
                required
                type='number'
                  value={editingAddress?.phoneNumber || ''}
                  onChange={(e) => setEditingAddress({ ...editingAddress!, phoneNumber: e.target.value })}
                />
              </div>
              <div>
                <Label>Street</Label>
                <Textarea
                  value={editingAddress?.street || ''}
                  onChange={(e) => setEditingAddress({ ...editingAddress!, street: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>City</Label>
                  <Input
                    value={editingAddress?.city || ''}
                    onChange={(e) => setEditingAddress({ ...editingAddress!, city: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Postal Code</Label>
                  <Input
                    value={editingAddress?.postalCode || ''}
                    onChange={(e) => setEditingAddress({ ...editingAddress!, postalCode: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  value={editingAddress?.country || ''}
                  onChange={(e) => setEditingAddress({ ...editingAddress!, country: e.target.value })}
                />
              </div>
              <Button onClick={saveAddress} className="mt-4 w-full">
                Save Address
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {addresses.map((address) => (
          <Card key={address.id}>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>{address.fullName}</CardTitle>
              <Button size="sm" variant="outline" onClick={() => {
                setEditingAddress(address);
                setOpen(true);
              }}>
                Edit
              </Button>
            </CardHeader>
            <CardContent>
              <p>{address.street}</p>
              <p>{address.city}, {address.postalCode}</p>
              <p>{address.country}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
